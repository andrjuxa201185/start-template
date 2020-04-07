import axios from 'axios';
import {globals} from '../store/globals';
import Auth from './auth';
import * as authActions from '../store/auth/authActions';
import {showAlert} from '../store/alert/alertActions';
import {splitStringMainLetter} from '../utils';
import {DOMAIN_API_URI, PATH_API_URI} from './apiConstants';

export default class Api {
  static methods = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
  };

  static get initialStatus() {
    return {
      loading: false,
      loaded: false,
      fail: false,
    };
  }

  static get requestStatus() {
    return {
      loading: true,
      loaded: false,
      fail: false,
    };
  }

  static get successStatus() {
    return {
      loading: false,
      loaded: true,
      fail: false,
    };
  }

  static get failStatus() {
    return {
      loading: false,
      loaded: false,
      fail: true,
    };
  }

  static composeRouteUrl(route) {
    if (route.startsWith('http')) {
      return route;
    }
    return `${DOMAIN_API_URI}${PATH_API_URI}${route}`;
  }

  static get(route, params) {
    return Api.request(route, params, undefined, Api.methods.GET);
  }

  static put(route, params, data) {
    return Api.request(route, params, data, Api.methods.PUT);
  }

  static patch(route, params, data) {
    return Api.request(route, params, data, Api.methods.PATCH);
  }

  static post(route, data, appendHeaders, handleFormError = true) {
    return Api.request(route, undefined, data, Api.methods.POST, appendHeaders, handleFormError);
  }

  static delete(route, params) {
    return Api.request(route, params, undefined, Api.methods.DELETE);
  }

  static alert(msg) {
    if (typeof msg === 'string') {
      globals.store.dispatch(showAlert({
        title: 'Notification',
        msg: msg,
      }));
    } else if (typeof msg === 'object' && msg.title && msg.text) {
      globals.store.dispatch(showAlert({
        title: msg.title,
        msg: msg.text,
      }));
    }
  }

  static uploadImage(url, method, image) {
    const form = new FormData();
    form.append('photo', image, image.name);
    let headers = {
      'Content-Type': 'multipart/form-data',
    };
    const token = Auth.getTokenFromLocalStorage();
    if (token) {
      headers['Authorization'] = `${token.access_token_type} ${token.access_token}`;
    }
    return axios({
      method,
      url: Api.composeRouteUrl(url),
      headers,
      data: form,
    }).then(resp => {
      return resp;
    }).catch(err => {
      Api.handleError(err);
      throw err;
    });
  }

  static fileDownload(url, method) {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };
    const token = Auth.getTokenFromLocalStorage();
    if (token) {
      headers['Authorization'] = `${token.access_token_type} ${token.access_token}`;
    }
    return axios({
      method,
      url: Api.composeRouteUrl(url),
      headers,
      responseType: 'blob',
    })
      .then(resp => {
        return resp;
      })
      .catch(err => {
        Api.handleError(err);
        throw err;
      });
  }

  static request(route, params, data, method, appendHeaders, handleFormError) {
    const url = Api.composeRouteUrl(route, params);
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    };
    const token = Auth.getTokenFromLocalStorage();
    if (token) {
      headers['Authorization'] = `${token.access_token_type} ${token.access_token}`;
    }
    if (appendHeaders) {
      headers = {...headers, ...appendHeaders};
    }

    return axios({
      method,
      url,
      headers,
      params,
      data,
    })
      .then(resp => {
        if (resp.data.msg) {
          Api.alert(resp.data.msg);
        }
        return resp;
      })
      .catch(err => {
        Api.handleError(err, handleFormError);
        throw err;
      });
  }

  static handleError(error, handleFormError) {
    const response = error.response || error;
    let message = response.data && response.data.msg;
    let details = '';

    if (response.status === 401) {
      globals.history.push('/auth/login');
      globals.store.dispatch(authActions.logout());
    }

    if (handleFormError) {
      if (response.data?.errors && Object.keys(response.data.errors).length) {
        for (let name in response.data.errors) {
          details += `${splitStringMainLetter(name + '', '_')}: ${response.data.errors[name]}\n`;
        }
      }
      if (message) {
        Api.alert({
          title: 'Error',
          text: details || typeof message === 'object' ? message.text : message,
        });
      }
    }
    console.log(`Error occurred\\n${response.status} ${response.data.code}`); //eslint-disable-line
  }

  /*********THIS IS TESTING REQUEST TO LOCAL SERVER*************/
  static testRequest(route, method = 'get', data) {
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    if (data) options.body = JSON.stringify(data);

    let statusCode = '';

    return fetch(`http://localhost:4242${route}`, options)
      .then(res => {
        if (res.ok) {
          statusCode = res.status;
          return res.json();
        } else {
          throw new Error('error');
        }
      })
      .then(data => ({data, status: statusCode}))
      .catch(err => {
        console.log(err);
        throw String(err);
      });
  }
}

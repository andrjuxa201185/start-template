import {call, put, take} from 'redux-saga/effects';
import {actionTypes} from './tributePageActions';
import * as actions from './tributePageActions';
import Api from "../../service/api";
import {showAlert} from "../alert/alertActions";
import {globals} from "../globals";
import {REQUEST} from "../../utils/action";
import {DASHBOARD} from "../../navigation/routes";
import moment from "moment/moment";
import {getDesign, setDesign} from "../design/designActions";
import {getAllNum} from "../../helpers/common";

const {
  GET,
  CREATE,
  UPDATE_GENERAL,
  GET_GENERAL,
  IS_PUBLISHED,
  SAVE_PHOTO,
  GET_PHOTO,
  UPDATE_SETTING,
  GET_URL,
  SET_URL,
  GET_TAB_HOME,
  SET_TABS_TITLES,
  SET_PASSWORD,
  GET_AUTHOR,
  GET_EDITORS,
  ADD_EDITOR,
  DELETE_EDITOR,
  SET_DESIGN,
  SHARE_SMS,
  SHARE_EMAIL,
} = actionTypes;

/***************************** Sagas ************************************/

const test = {
  id: 3,
  string_id: 'site-name',
  author_user_id: 6,
  first_name: 'rhrt',
  last_name: 'hrth',
  date_of_birth: '2011-08-17',
  date_of_death: '2011-08-18',
  photo: '/storage/files/tributes/SFei3rVXJymv2wVhppEQPLzmEzALZL8Wl5HpHLbc.',
  is_visible_to_guests: 1,
  password_is_required: 0,
  appears_in_j3tech_search: 1,
  appears_in_search_engines: 1,
  is_published: true,
  is_active: 0,
  shop_tab_name: 'Gift Shop',
  shop_tab_is_visible: true,
  shop_tab_header_title: 'Shop Example Title',
  shop_tab_header_description: 'Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description.',
  wall_tab_name: 'Tribute Wall',
  wall_tab_is_visible: true,
  wall_tab_header_title: 'Wall Example Title',
  wall_tab_header_description: 'Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description.',
  event_tab_name: 'Events',
  event_tab_is_visible: true,
  event_tab_header_title: 'Event Example Title',
  event_tab_header_description: 'Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description.',
  home_tab_name: 'Home',
  home_tab_is_visible: true,
  home_tab_header_title: 'Home Example Title',
  home_tab_header_description: 'Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description. Example Description.',
  tribute_design_id: 2,
  password_is_set: true,
  design: {
    id: 2,
    name: 'FlowerV2',
    preview: '/storage/files/tributeDesigns/images/previews/FlowerV2.jpg',
    object: {
      tribute_page: {
        background: {
          color: '#f8f8f8',
          image: null,
        },
        tribute_body: {
          tab_body: {
            section: {
              text: {
                color: '#140900',
              },
              tile: {
                title: {
                  text: {
                    color: '#ffffff',
                  },
                  background: {
                    color: '#f6b300',
                  },
                },
                background: {
                  color: '#ffffff',
                },
              },
              title: {
                text: {
                  color: '#140900',
                },
                background: {
                  color: null,
                },
              },
              button: {
                active: {
                  text: {
                    color: '#ffffff',
                  },
                  background: {
                    color: '#140900',
                  },
                },
                inactive: {
                  text: {
                    color: '#ffffff',
                  },
                  background: {
                    color: '#e6e6e6',
                  },
                },
              },
              background: {
                color: '#ffffff',
              },
            },
          },
          background: {
            color: null,
            image: null,
          },
          tab_header: {
            title: {
              text: {
                color: '#140900',
              },
            },
            background: {
              color: '#ffffff',
            },
            description: {
              text: {
                color: '#140900',
              },
            },
          },
        },
        tribute_footer: {
          text: {
            color: '#ffffff',
          },
          background: {
            color: '#140900',
            image: null,
          },
        },
        tribute_header: {
          photo: {
            shadow: {
              color: '#fefefe',
            },
            background: {
              color: '#ffffff',
            },
          },
          tab_link: {
            text: {
              color: '#140900',
            },
            underline: {
              color: '#140900',
            },
          },
          background: {
            color: '#f5b300',
            image: '/storage/files/tributeDesigns/images/backgrounds/FlowerV2.jpg',
          },
          social_link: {
            icon: {
              color: '#ffffff',
            },
            background: {
              color: '#140900',
            },
          },
          general_data: {
            text: {
              color: '#140900',
            },
          },
        },
      },
    },
    is_active: true,
  },
};

function* getTributePageSaga() {
  //set search params to window location
  // const url = new URL(window.location);
  // url.searchParams.set('tribute', JSON.stringify(test));
  // window.location.search = url.search;

  while (true) {
    const {data: {password, pageId}} = yield take(GET[REQUEST]);
    const requestData = {password};
    try {
      if (pageId !== '0') {
        const response = yield call(Api.get, `tributes/${pageId}`, requestData);
        if (response.status === 200) {
          const {data} = response.data;
          yield put(actions.getTributePage.success(data));
          if (data.tribute?.design) {
            yield put(getDesign.success(data.tribute.design));
          }
          if (password && !data.tribute) {
            yield put(showAlert({
              title: 'Error',
              msg: 'Password is wrong',
            }));
          }
        }
      } else {
        const url = new URL(window.location);
        let tributeUrl = url.searchParams.get('tribute');
        if (tributeUrl) {
          tributeUrl = JSON.parse(tributeUrl);
          yield put(actions.getTributePage.success({
            tribute: tributeUrl,
            viewing_is_authorized: true,
            editing_is_authorized: false,
          }));
          yield put(getDesign.success(tributeUrl.design));
        }
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.getTributePage.failure());
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error Page',
          msg: response.data.errors.tribute,
        }));
      } else {
        yield put(showAlert({
          title: 'Error get data of tribute page',
          msg: 'errors',
        }));
      }
    }
  }
}

function* setDesignSaga() {
  while (true) {
    const {data: {pageId, designId}} = yield take(SET_DESIGN[REQUEST]);
    try {
      const response = yield call(Api.post, `tributes/${pageId}/design/set`, {tribute_design_id: designId});
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.setDesign.success(data.tribute_design));
        yield put(setDesign(data.tribute_design));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.setDesign.failure());
      yield put(showAlert({
        title: 'Error set design',
        msg: 'errors',
      }));
    }
  }
}

function* createTributePage() {
  while (true) {
    const {data} = yield take(CREATE[REQUEST]);

    try {
      let response;
      if (data.newAvatar) {
        let form = new FormData();
        form.append('photo', data.newAvatar, 'avatar.jpg');
        form.append('first_name', data.firstName);
        form.append('last_name', data.lastName);
        form.append('date_of_birth', moment(data.birthDate).format('YYYY-MM-DD'));
        form.append('date_of_death', moment(data.deathDate).format('YYYY-MM-DD'));
        form.append('appears_in_search_engines', data.appearInSearchEngines ? 1 : 0);
        form.append('appears_in_j3tech_search', data.appearInJ3Tech ? 1 : 0);
        form.append('is_visible_to_guests', data.visibleToGuests ? 1 : 0);
        form.append('password_is_required', data.requirePassword ? 1 : 0);
        form.append('string_id', data.websiteUrl);
        form.append('password', data.password);
        form.append('tribute_design_id', data.design);
        form.append('editors', JSON.stringify(data.editors));
        response = yield call(Api.post, 'tributes', form, {'Content-Type': 'multipart/form-data'});
      } else {
        const dataRequest = {
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: moment(data.birthDate).format('YYYY-MM-DD'),
          date_of_death: moment(data.deathDate).format('YYYY-MM-DD'),
          appears_in_search_engines: data.appearInSearchEngines,
          appears_in_j3tech_search: data.appearInJ3Tech,
          is_visible_to_guests: data.visibleToGuests,
          password_is_required: data.requirePassword,
          password: data.password,
          string_id: data.websiteUrl,
          editors: data.editors,
          tribute_design_id: data.design,
        };
        response = yield call(Api.post, 'tributes', dataRequest);
      }
      if (response.status === 200) {
        yield put(actions.createTributePage.success(response.data.data));
        if (response.data.data.tribute.string_id) {
          globals.history.push(`/${response.data.data.tribute.string_id}`);
        } else {
          globals.history.push(`/${response.data.data.tribute.id}`);
        }
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.createTributePage.failure());
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error Create',
          msg: response.data.errors.string_id,
        }));
      } else {
        yield put(showAlert({
          title: 'Error create tribute page',
          msg: 'errors',
        }));
      }
    }
  }
}

function* savePhotoSaga() {
  while (true) {
    const {data} = yield take(SAVE_PHOTO[REQUEST]);
    try {
      const response = yield call(Api.uploadImage, `tributes/${data.pageId}/general/data/photo/set`, 'POST', data.image);
      if (response.status === 200) {
        yield put(actions.savePhoto.success(response.data.data.tribute_general_data_photo));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.savePhoto.failure());
      yield put(showAlert({title: 'Error', msg: 'errors'}));
    }
  }
}

function* getPhotoSaga() {
  while (true) {
    const {data} = yield take(GET_PHOTO[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${data.pageId}/general/data/photo`);
      if (response.status === 200) {
        yield put(actions.getPhoto.success(response.data.data.tribute_general_data_photo));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getPhoto.failure());
      yield put(showAlert({title: 'Error', msg: 'errors'}));
    }
  }
}

function* getUrlSaga() {
  while (true) {
    const {data} = yield take(GET_URL[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${data.pageId}/string_id`);
      if (response.status === 200) {
        yield put(actions.getUrl.success(response.data.data.tribute_string_id));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getUrl.failure());
      yield put(showAlert({title: 'Error get url', msg: 'errors'}));
    }
  }
}

function* setUrlSaga() {
  while (true) {
    const {data, onSuccess} = yield take(SET_URL[REQUEST]);
    try {
      const response = yield call(Api.post, `tributes/${data.pageId}/string_id/set`, {string_id: data.websiteUrl});
      if (response.status === 200) {
        yield put(showAlert({title: response.data.message}));
        yield put(actions.setUrl.success(response.data.data.tribute_string_id));
        if (!data.websiteUrl) {
          globals.history.push(`/${data.pageId}`);
        } else {
          globals.history.push(`/${data.websiteUrl}`);
        }
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.setUrl.failure());
      if (response.status === 422) {
        yield put(showAlert({
          title: response.data.message,
          msg: response.data.errors.string_id[0],
        }));
      } else {
        yield put(showAlert({title: 'Error set url', msg: 'error'}));
      }
    } finally {
      onSuccess?.();
    }
  }
}

function* getGeneralDataSaga() {
  while (true) {
    const {data} = yield take(GET_GENERAL[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${data}/general/data`);
      if (response.status === 200) {
        yield put(actions.getGeneralData.success(response.data.data.tribute_general_data));
      } else {
        yield put(actions.getGeneralData.failure());
      }
    } catch (e) {
      const response = e.response || e;
      yield put(actions.getGeneralData.failure());
      if (response.status === 422) {
        yield put(showAlert({
          title: 'Error Page',
          msg: response.data.errors.tribute,
        }));
        globals.history.push(DASHBOARD);
      } else {
        yield put(showAlert({title: 'Error Get General data', msg: 'errors'}));
      }
    }
  }
}

function* updateGeneralData() {
  while (true) {
    const {data, onSuccess} = yield take(UPDATE_GENERAL[REQUEST]);
    try {
      let response;
      if (data.newAvatar) {
        let form = new FormData();
        form.append('photo', data.newAvatar, 'avatar.jpg');
        form.append('first_name', data.firstName);
        form.append('last_name', data.lastName);
        form.append('date_of_birth', moment(data.birthDate).format('YYYY-MM-DD'));
        form.append('date_of_death', moment(data.deathDate).format('YYYY-MM-DD'));
        response = yield call(Api.post, `tributes/${data.pageId}/general/data/set`, form, {'Content-Type': 'multipart/form-data'});
      } else {
        const dataRequest = {
          first_name: data.firstName,
          last_name: data.lastName,
          date_of_birth: moment(data.birthDate).format('YYYY-MM-DD'),
          date_of_death: moment(data.deathDate).format('YYYY-MM-DD'),
        };
        response = yield call(Api.post, `tributes/${data.pageId}/general/data/set`, dataRequest);
      }
      if (response.status === 200) {
        yield put(actions.updateTributePage.success(response.data.data.tribute_general_data));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.updateTributePage.failure());
      yield put(showAlert({title: 'Error', msg: 'errors'}));
    } finally {
      onSuccess && onSuccess();
    }
  }
}

function* setIsPublishedSaga() {
  while (true) {
    const {data} = yield take(IS_PUBLISHED[REQUEST]);
    try {
      const route = data.published ? 'publish' : 'unpublish';
      const response = yield call(Api.patch, `tributes/${data.pageId}/${route}`);
      if (response.status === 200) {
        yield put(actions.setIsPublished.success(data.published));
        yield put(showAlert({title: 'Success', msg: response.data.message}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.setIsPublished.failure());
      yield put(showAlert({title: 'Error', msg: 'errors'}));
    }
  }
}

function* getTabHomeSaga() {
  while (true) {
    const {data} = yield take(GET_TAB_HOME[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${data}/tabs/home/data`);
      console.log('getTabHomeSaga');
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getTabHome.success(data));
      } else {
        yield put(actions.getTabHome.failure());
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getTabHome.failure());
      yield put(showAlert({title: 'Error ', msg: 'error'}));
    }
  }
}

function* setTabsTitlesSaga() {
  while (true) {
    const {data, onSuccess} = yield take(SET_TABS_TITLES[REQUEST]);
    const dataRequest = {
      pageId: data.pageId,
      [`${data.type}_tab_name`]: data.name,
      [`${data.type}_tab_is_visible`]: data.visible,
      [`${data.type}_tab_header_title`]: data.title,
      [`${data.type}_tab_header_description`]: data.description,
    };
    try {
      const response = yield call(Api.post, `tributes/${data.pageId}/tabs/${data.type === 'event' ? 'events' : data.type}/data/set`, dataRequest);
      if (response.status === 200) {
        yield put(actions.setTabsTitles.success(response.data.data[`tribute_${data.type}_tab_data`]));
        onSuccess?.();
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.setTabsTitles.failure());
      yield put(showAlert({title: 'Error ', msg: 'error'}));
    }
  }
}

function* updateSettingSaga() {
  while (true) {
    const {data} = yield take(UPDATE_SETTING[REQUEST]);
    try {
      const route = {
        ['appearInSearchEngines']: 'appears_in_search_engines',
        ['appearInJ3Tech']: 'appears_in_j3tech_search',
        ['requirePassword']: 'password_is_required',
        ['visibleToGuests']: 'is_visible_to_guests',
      };
      const requestData = {
        [route[data.field]]: data.value,
      };
      const response = yield call(Api.post, `tributes/${data.pageId}/${route[data.field]}/set`, requestData);
      if (response.status === 200) {
        yield put(actions.updateSetting.success({[route[data.field]]: !!data.value}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.updateSetting.failure());
      yield put(showAlert({title: 'Error ', msg: 'error'}));
    }
  }
}

function* setPagePasswordSaga() {
  while (true) {
    const {data: {pageId, password}} = yield take(SET_PASSWORD[REQUEST]);
    try {
      const requestData = {
        password,
      };
      const response = yield call(Api.post, `tributes/${pageId}/password/${password ? 'set' : 'unset'}`, password && requestData);
      if (response.status === 200) {
        yield put(actions.setPagePassword.success({password_is_set: !!password}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.setPagePassword.failure());
      yield put(showAlert({title: 'Error change password', msg: 'error'}));
    }
  }
}

function* addPageEditorSaga() {
  while (true) {
    const {data, onSuccess} = yield take(ADD_EDITOR[REQUEST]);
    try {
      const requestData = {
        user_email: data.editor,
      };
      const response = yield call(Api.post, `tributes/${data.pageId}/editors/add`, requestData);
      if (response.status === 200) {
        yield put(actions.addPageEditor.success(response.data.data.tribute_editors));
      }
    } catch (e) {
      const response = e.response || e;
      if (response.status === 422) {
        yield put(showAlert({
          title: response.data.message,
          msg: response.data.errors.user_email[0],
        }));
      } else {
        yield put(showAlert({title: 'Error Add Page Editor', msg: 'error'}));
      }
      yield put(actions.addPageEditor.failure());
    } finally {
      onSuccess?.();
    }
  }
}

function* daletePageEditorSaga() {
  while (true) {
    const {data, onSuccess} = yield take(DELETE_EDITOR[REQUEST]);
    try {
      const requestData = {
        user_id: data.id,
      };
      const response = yield call(Api.delete, `tributes/${data.pageId}/editors/remove`, requestData);
      if (response.status === 200) {
        yield put(actions.deletePageEditor.success({id: data.id}));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(showAlert({title: 'Error Add Page Editor', msg: 'error'}));
      yield put(actions.deletePageEditor.failure());
    } finally {
      onSuccess?.();
    }
  }
}

function* getTributeAuthorSaga() {
  while (true) {
    const {data: {pageId}} = yield take(GET_AUTHOR[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${pageId}/author`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getTributeAuthor.success(data.tribute_author));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getTributeAuthor.failure());
      yield put(showAlert({title: 'Error Get Tribute Author', msg: 'error'}));
    }
  }
}

function* getTributeEditorsrSaga() {
  while (true) {
    const {data: {pageId}} = yield take(GET_EDITORS[REQUEST]);
    try {
      const response = yield call(Api.get, `tributes/${pageId}/editors`);
      if (response.status === 200) {
        const {data} = response.data;
        yield put(actions.getTributeEditors.success(data.tribute_editors));
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.getTributeEditors.failure());
      yield put(showAlert({title: 'Error Get Tribute Editors', msg: 'error'}));
    }
  }
}

function* shareSmsSaga() {
  while (true) {
    const {data: {pageId, checkedContacts, captchaToken}, onSuccess} = yield take(SHARE_SMS[REQUEST]);
    try {
      const requestList = checkedContacts.map(({name, phone}) => {
        return {phone: getAllNum(phone), name};
      });
      const requestData = {
        contacts: JSON.stringify(requestList),
        recaptcha_token: captchaToken,
      };
      const response = yield call(Api.post, `tributes/${pageId}/share/viaSms`, requestData);
      if (response.status === 200) {
        yield put(actions.shareSms.success());
        onSuccess?.();
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(actions.shareSms.failure());
      yield put(showAlert({title: 'Error Send SMS', msg: 'error'}));
    }
  }
}

function* shareEmailSaga() {
  while (true) {
    const {data: {pageId, checkedContacts, message, captchaToken}, onSuccess} = yield take(SHARE_EMAIL[REQUEST]);
    try {
      const requestList = checkedContacts.map(({name, email}) => {
        return {email, name};
      });

      const requestData = {
        recaptcha_token: captchaToken,
        contacts: JSON.stringify(requestList),
        message,
      };

      const response = yield call(Api.post, `tributes/${pageId}/share/viaEmail`, requestData);
      if (response.status === 200) {
        yield put(actions.shareEmail.success());
        onSuccess?.();
      }
    } catch (e) {
      // const response = e.response || e;
      yield put(showAlert({title: 'Error Send Email', msg: 'error'}));
      yield put(actions.shareEmail.failure());
    }
  }
}

export default [
  shareSmsSaga,
  getTributePageSaga,
  createTributePage,
  updateGeneralData,
  getGeneralDataSaga,
  savePhotoSaga,
  shareEmailSaga,
  getPhotoSaga,
  getTabHomeSaga,
  setTabsTitlesSaga,
  getUrlSaga,
  setUrlSaga,
  setIsPublishedSaga,
  updateSettingSaga,
  setPagePasswordSaga,
  getTributeAuthorSaga,
  getTributeEditorsrSaga,
  addPageEditorSaga,
  daletePageEditorSaga,
  setDesignSaga,
];


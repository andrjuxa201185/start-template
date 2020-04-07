import React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {Header, Footer} from "../components/common";

import {
  Login,
  Dashboard,
  Registration,
} from '../components/pages';

import * as ROUTES from './routes';

// eslint-disable-next-line
const RouterComponent = ({token}) => {

  const loginedConfig = [
    {
      id: 'dashboard',
      path: ROUTES.DASHBOARD,
      Component: Dashboard,
      exact: true,
    },
  ];

  const notLoginedConfig = [
    {
      id: 'login',
      path: ROUTES.LOGIN,
      Component: Login,
      exact: true,
    },
    {
      id: 'registration',
      path: ROUTES.REGISTRATION,
      Component: Registration,
      exact: true,
    },
  //  for test
    {
      id: 'dashboard',
      path: ROUTES.DASHBOARD,
      Component: Dashboard,
      exact: true,
    },
  ];

  const config = token ? loginedConfig : notLoginedConfig;

  return (
    <>
      <Header/>
      <Switch>
        {config.map(({id, path, Component, exact}) => (
          <Route
            key={id}
            path={path}
            render={routeProps => {
              return <Component {...routeProps}/>;
            }}
            exact={!!exact}
          />
        ))}
        <Redirect to={{pathname: token ? ROUTES.DASHBOARD : ROUTES.LOGIN}}/>
      </Switch>
      <Footer/>
    </>
  );
};

const mapStateToProps = ({auth: {token}}) => ({
  token: token,
});

export default withRouter(connect(mapStateToProps)(RouterComponent));

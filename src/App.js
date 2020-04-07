import React from 'react';
import { withRouter } from 'react-router';
import connect from 'react-redux/es/connect/connect';
import PropTypes from "prop-types";
import {Alert} from './components/common';

class App extends React.Component {

  render() {
    return (
      <>
        {this.props.children}
        <Alert />
      </>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withRouter(connect(null)(App));

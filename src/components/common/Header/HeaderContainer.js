import React from 'react';
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from "redux";
import PropTypes from 'prop-types';
import HeaderView from './HeaderView';
import {globals} from "../../../store/globals";

class HeaderContainer extends React.Component {

  navTo = route => e => {
    e.preventDefault();
    globals.history.push(route);
  };

  render() {
    return (
      <HeaderView
        navTo={this.navTo}
      />
    );
  }
}

HeaderContainer.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

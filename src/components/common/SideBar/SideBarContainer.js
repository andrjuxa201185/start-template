import React, {Component} from 'react';
import PropTypes from "prop-types";
import connect from 'react-redux/es/connect/connect';
import {bindActionCreators} from "redux";
import SideBarView from './SideBarView';
import {
  DASHBOARD,
} from "../../../navigation/routes";

class SideBarContainer extends Component {
  navItems = [
    {
      text: 'dashboard',
      linkTo: DASHBOARD,
    },
  ];

  render() {

    return (
      <SideBarView
        navItems={this.navItems}
      />
    );
  }
}

SideBarContainer.propTypes = {};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(null, mapDispatchToProps)(SideBarContainer);

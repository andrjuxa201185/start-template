import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import DashboardView from './DashboardView';

class DashboardContainer extends Component {

  render() {

    return (
      <DashboardView/>
    );
  }
}

DashboardContainer.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);


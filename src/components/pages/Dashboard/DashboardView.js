import React from 'react';
import PropTypes from 'prop-types';
import styles from './DashboardStyles.scss';
import {SideBar} from '../../common';

const DashboardView = () => {
  return (
    <div className={styles.wrapper}>
      <div className='d-flex'>
        <SideBar/>
        <div className={styles.dashboard}>
          DASHBOARD
        </div>
      </div>
    </div>
  );
};

DashboardView.propTypes = {};

export default DashboardView;

import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  DASHBOARD,
  LOGIN,
  REGISTRATION,
} from '../../../navigation/routes';
import styles from './HeaderStyles.scss';
import logoImage from '../../../assets/images/logos/logo.png';
import {Button} from '../../controls';

const HeaderView = ({navTo}) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link to={DASHBOARD}>
          <img src={logoImage} className={styles.logoImg} alt='logo'/>
        </Link>
        <div>
          <Button
            title={'SIGN IN'}
            onClick={navTo(`${LOGIN}`)}
            style={'transparent'}
          />
          <Button
            title={'JOIN NOW'}
            onClick={navTo(`${REGISTRATION}`)}
          />
        </div>
      </div>
    </div>
  );
};

HeaderView.propTypes = {
  navTo: PropTypes.func.isRequired,
};

export default HeaderView;

import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from '../../controls';
import styles from './LoginStyles.scss';

const LoginView = ({
                     onChange,
                     onSubmit,
                     errors,
                     fields,
                   }) => {
  return (
    <div className={styles.login}>
      <Input
        value={fields['email']}
        name={'email'}
        placeholder='Email Address'
        onChange={onChange}
        error={errors['email']}
      />
      <Input
        value={fields['password']}
        name={'password'}
        placeholder='Password'
        type='password'
        onChange={onChange}
        error={errors['password']}
      />
      <Button
        onClick={onSubmit}
        title={'SIGN IN'}
      />
    </div>
  );
};

LoginView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
};

export default LoginView;

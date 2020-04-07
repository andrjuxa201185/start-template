import React from 'react';
import PropTypes from 'prop-types';
import {Input, Button} from '../../controls';
import styles from './RegistrationStyles.scss';

const RegistrationView = ({
                            onChange,
                            onSubmit,
                            errors,
                            fields,
                          }) => {

  return (
    <div className={styles.wrapper}>
      <Input
        value={fields['firstName']}
        name={'firstName'}
        placeholder='First Name'
        onChange={onChange}
        error={errors['firstName']}
      />
      <Input
        value={fields['lastName']}
        name={'lastName'}
        placeholder='Last Name'
        onChange={onChange}
        error={errors['lastName']}
      />
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
        title={'SIGN UP'}
      />
    </div>
  );
};

RegistrationView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  fields: PropTypes.object.isRequired,
};

export default RegistrationView;

import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InputStyles.scss';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';

const Input = ({
                 error,
                 tabIndex = 0,
                 type,
                 className = '',
                 readOnly,
                 ...props
               }) => {
  let [newType, setNewType] = useState(type === 'password' ? 'password' : 'text');

  const changeType = () => {
    if (newType === 'password') {
      setNewType('text');
    } else {
      setNewType('password');
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type={newType}
        tabIndex={tabIndex}
        className={`
          ${styles.input}
          ${error ? styles.input_error : ''}
          ${readOnly ? styles.input_readOnly : ''}
          ${className}
          `}
        readOnly={readOnly}
        {...props}
      />

      {type === 'password' &&
      <div
        className={styles.isShowWrapper}
        onClick={changeType}
      >
        {newType === 'password'
          ? <FaRegEye className={styles.isShowIcon}/>
          : <FaRegEyeSlash className={styles.isShowIcon}/>
        }
      </div>
      }

      <div className={styles.error}>
        {error ? error : ''}
      </div>
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
  readOnly: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;

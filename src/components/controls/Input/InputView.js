import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './InputStyles.scss';
import {FaRegPlusSquare, FaRegMinusSquare} from 'react-icons/fa';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';

const Input = ({
                 children,
                 error,
                 tabIndex = 0,
                 Icon,
                 type,
                 className = '',
                 classWrapper = '',
                 inc,
                 dec,
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
    <div className={`${styles.wrapper} ${classWrapper}`}>
      <div className={styles.input__container}>
        {Icon &&
        <Icon className={styles.icon}/>
        }
        <input
          type={newType}
          tabIndex={tabIndex}
          className={`
          ${styles.input}
          ${Icon ? '' : styles.withoutIcon}
          ${error ? styles.input_error : ''}
          ${readOnly ? styles.input_readOnly : ''}
          ${className}
          `}
          readOnly={readOnly}
          {...props}
        />
        {children}
      </div>

      {type === 'number' &&
      <div className={styles.numWrapper}>
        <FaRegPlusSquare onClick={inc} className={styles.numItem}/>
        <FaRegMinusSquare onClick={dec} className={styles.numItem}/>
      </div>
      }
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
  Icon: PropTypes.func,
  className: PropTypes.string,
  classWrapper: PropTypes.string,
  inc: PropTypes.func,
  dec: PropTypes.func,
  children: PropTypes.node,
  tabIndex: PropTypes.number,
  readOnly: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;

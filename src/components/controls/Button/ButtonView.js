import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonStyles.scss';
import {PulseLoader} from 'react-spinners';

const getClassName = style => {
  switch (style) {
    case 'primal':
      return styles.primal;
    case 'transparent':
      return styles.transparent;
    case 'grey' :
      return styles.grey;
    case 'black' :
      return styles.black;
  }
};

const getSize = size => {
  switch (size) {
    case 'sm':
      return styles.sm;
    case 'md':
      return styles.md;
    default:
      return styles.lg;
  }
};

const Button = ({
                  title,
                  onClick,
                  style,
                  loading,
                  disabled,
                  size,
                  className = '',
                  tabIndex = 0,
                }) => {

  return (
    <button
      onClick={onClick}
      className={`${className} ${styles.button} ${getClassName(style)} ${getSize(size)}
      ${disabled ? styles.disabled : ''}`}
      disabled={disabled || loading}
      tabIndex={tabIndex}
    >
      {loading ?
        <div className={styles.spinner}>
          <PulseLoader
            size={10}
            color={'#4e0082'}
            loading
            margin={'7px'}
          />
        </div> :
        <span>{title}</span>
      }
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  tabIndex: PropTypes.number,
};

Button.defaultProps = {
  style: 'primal',
  disabled: false,
  loading: false,
  size: 'lg',
};

export default Button;

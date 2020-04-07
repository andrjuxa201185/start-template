import React from 'react';
import PropTypes from 'prop-types';
import styles from './RadioBtnStyles.scss';

const RadioBtn = ({title, text, onChange, name, className = '', Icon, ...props}) => {

  return (
    <div className={`${styles.container} ${className}`}>
      <label className={styles.wrapper}>
        <input type='radio' name={name} onChange={onChange}
               className={styles.radio} {...props}/>
        <div className={styles.radioContent}>
          <div className={styles.radioIndicator}>
          </div>
          <div className={styles.textContent}>
            <div className={styles.radioTitle}>
              {title}
            </div>
            {text &&
            <div className={styles.radioText}>
              {text}
            </div>
            }
          </div>
        </div>
        {Icon &&
        <Icon className={styles.radioIcon}/>
        }
      </label>
    </div>
  );
};

RadioBtn.propTypes = {
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onChange: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  Icon: PropTypes.func,
};

export default RadioBtn;

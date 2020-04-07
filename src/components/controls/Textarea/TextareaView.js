import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextareaStyles.scss';

const Textarea = ({label, error, className = '', ...props}) => {

  return (
    <div className={`${styles.container}`}>
      <div className={styles.label}>
        {label}
      </div>
      <div className={styles.textarea__container}>
        <textarea
          {...props}
          className={`${styles.textarea} ${className} ${error ? styles.textarea_error : ''}`}
        >
        </textarea>
      </div>
      {/*<div className={styles.error}>*/}
      {/*{error ? error : ''}*/}
      {/*</div>*/}
    </div>
  );
};

Textarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Textarea;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextareaStyles.scss';

const Textarea = ({error, className = '', ...props}) => {

  return (
    <div className={`${styles.container}`}>
      <textarea
          className={`${styles.textarea} ${className} ${error ? styles.textarea_error : ''}`}
          {...props}
        />

      <div className={styles.error}>
        {error ? error : ''}
      </div>
    </div>
  );
};

Textarea.propTypes = {
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Textarea;

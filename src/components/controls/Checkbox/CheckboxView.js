import React from 'react';
import PropTypes from 'prop-types';
import styles from './CheckboxStyles.scss';

const Checkbox = ({
                    onChange,
                    ...props
                  }) => {

  return (
    <div className={styles.container}>
      <label className={styles.wrapper}>
        <input type='checkbox' onChange={onChange}
               className={styles.checkbox} {...props}/>
        <span className={styles.checkboxLabel}/>
        <span className={styles.checkboxText}/>
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default Checkbox;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './SpinnerStyles.scss';

import {FadeLoader} from 'react-spinners';
//
// const getSize = size => {
//   switch (size) {
//     case 'sm':
//       return styles.spinner_sm;
//     case 'md':
//       return styles.spinner_md;
//     case 'lg':
//       return styles.spinner_lg;
//   }
// };

const renderSpinner = () => (
  <FadeLoader
    height={20}
    color={'#4e0082'}
    loading
  />
);

const SpinnerView = ({size}) => {
  if (size === 'lg') {
    return (
      <div className={styles.spinner__fixed}>
        {renderSpinner()}
      </div>
    );
  }

  return (
    <div className={styles.spinner__block}>
      {renderSpinner()}
    </div>
  );
};

SpinnerView.propTypes = {
  size: PropTypes.string,
};

SpinnerView.defaultProps = {
  size: 'sm',
};

export default SpinnerView;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadMore.scss';
import {PulseLoader} from "react-spinners";

const LoadMore = ({onLoadMore, loading}) => {

  return (
    <div className={styles.loadMore}>
      <span onClick={onLoadMore} className={styles.loadMoreText}>
        {loading
          ? <PulseLoader
            size={13}
            color={'#4e0082'}
            loading
            margin={'7px'}
          />
          : 'Load more +'
        }
      </span>
    </div>
  );
};

LoadMore.propTypes = {
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;

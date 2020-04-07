import React from 'react';
import PropTypes from 'prop-types';
import styles from './NavPaginator.scss';
import {PulseLoader} from 'react-spinners';
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const NavPaginator = ({
                        countPage,
                        currentPage,
                        onNextPage,
                        onPrevPage,
                        loading,
                      }) => {

  return (
    <div className={styles.nav}>
      <FaChevronLeft
        className={styles.navIcon}
        onClick={onPrevPage}
      />
      {loading
        ? <PulseLoader
          size={10}
          color={'#4e0082'}
          loading
          margin={'3px'}
        />
        : <span className={styles.navInfo}>{currentPage} of {countPage}</span>
      }
      <FaChevronRight
        className={styles.navIcon}
        onClick={onNextPage}
      />
    </div>
  );
};

NavPaginator.propTypes = {
  onNextPage: PropTypes.func.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  countPage: PropTypes.number,
  currentPage: PropTypes.number,
  loading: PropTypes.bool,
};

export default NavPaginator;

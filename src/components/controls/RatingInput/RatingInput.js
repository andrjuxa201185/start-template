import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './RatingInput.scss';
import {FaStar} from 'react-icons/fa';

const RatingInput = ({rating, onSelect, error}) => {
  const [selectedRate, setSelectedRate] = useState(rating);
  const [rate, setRate] = useState(rating);

  const getClassName = rating => {
    switch (rating) {
      case 0:
        return styles.rating;
      case 1:
        return styles.ratingOne;
      case 2:
        return styles.ratingTwo;
      case 3:
        return styles.ratingThree;
      case 4:
        return styles.ratingFour;
      case 5:
        return styles.ratingFive;
    }
  };

  const renderStar = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push((
        <div
          key={i}
          className={styles.ratingItemEmpty}
          onClick={() => {
            setRate(i + 1);
            setSelectedRate(i + 1);
            onSelect(i + 1);
          }}
          onMouseOver={() => setRate(i + 1)}
          onMouseOut={() => setRate(selectedRate)}
        >
          <FaStar className={styles.ratingIco}/>
        </div>
      ));
    }

    return stars;
  };

  return (
    <div className={`${styles.ratingWrapper} ${getClassName(rate) || ''} ${error ? styles.error : ''}`}>
      {renderStar()}
    </div>
  );
};

RatingInput.propTypes = {
  rating: PropTypes.number,
  error: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

RatingInput.defaultProps = {
  // rating: 0,
  onSelect: _ => _,
};

export default RatingInput;

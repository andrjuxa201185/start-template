import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

const RaitingShow = ({rating}) => {
  const [starSize, setStarSize] = useState('30px');

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, []);

  const setSize = () => {
    if (window.innerWidth <= 640) {
      setStarSize('24px');
    } else {
      setStarSize('30px');
    }
  };

  const getRatingColor = rating => {
    const intRating = parseInt(rating);
    switch (intRating) {
      case 1:
        return '#db4f20';
      case 2:
        return '#ffab00';
      case 3:
        return '#ffab00';
      case 4:
        return '#ffe002';
      case 5:
        return '#9af418';
      default:
        return '#c8d0d8';
    }
  };

  return (
    <StarRatings
      starRatedColor={getRatingColor(rating)}
      numberOfStars={5}
      rating={rating}
      starEmptyColor={'#c8d0d8'}
      starDimension={starSize}
      starSpacing={'5px'}
    />
  );
};

RaitingShow.propTypes = {
  rating: PropTypes.number,
};

export default RaitingShow;

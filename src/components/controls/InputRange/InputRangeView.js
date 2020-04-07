import React from "react";
import PropTypes from 'prop-types';
import {Range} from 'rc-slider';

const InputRangeView = ({onChange, ...props}) => {

  const style = {
    trackStyle: [{
      backgroundColor: '#414141',
      height: 8,
    }],
    handleStyle: [
      {
        border: 'solid 1px #c6cad0',
        height: 25,
        width: 14,
        top: 1,
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
        borderRadius: '2px',
        cursor: 'pointer',
        backgroundColor: '#fefefe',
      },
      {
        border: 'solid 1px #c6cad0',
        height: 25,
        width: 14,
        top: 1,
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
        borderRadius: '2px',
        cursor: 'pointer',
        backgroundColor: '#fefefe',
      },
    ],
    railStyle: {
      backgroundColor: '#fafbfb',
      height: 8,
      border: 'solid 1px #c6cad0',
    },
    dotStyle: {
      backgroundColor: '#fafbfb',
      borderColor: '#fafbfb',
    },
    activeDotStyle: {
      backgroundColor: '#3f3f3f',
      borderColor: '#3f3f3f',
    },
  };

  return (
    <Range
      onChange={onChange}
      dots={false}
      trackStyle={style.trackStyle}
      handleStyle={style.handleStyle}
      railStyle={style.railStyle}
      dotStyle={style.dotStyle}
      activeDotStyle={style.activeDotStyle}
      {...props}
    />
  );
};

InputRangeView.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default InputRangeView;

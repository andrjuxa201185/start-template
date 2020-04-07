import React from "react";
import PropTypes from 'prop-types';
import Slider, { createSliderWithTooltip } from 'rc-slider';

const SliderWithTooltip = createSliderWithTooltip(Slider);

const InputSliderView = props => {

  if (props.tipProps) {
    return (
      <SliderWithTooltip
        {...props}
        trackStyle={{backgroundColor: '#fff', height: 8}}
        handleStyle={{
          border: 'none',
          height: 20,
          width: 20,
          top: '50%',
          boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
          borderRadius: '50%',
          cursor: 'pointer',
          transform: 'translateY(-50%)',
          marginLeft: 3,
          marginTop: -9,
          backgroundColor: '#fff',
        }}
        railStyle={{backgroundColor: '#fff', height: 8}}
      />
    );
  }
  return (
    <Slider
      {...props}
      trackStyle={{
        backgroundColor: '#fff',
        height: 8,
      }}
      handleStyle={{
        border: 'none',
        height: 20,
        width: 20,
        top: '50%',
        boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.75)',
        borderRadius: '50%',
        cursor: 'pointer',
        transform: 'translateY(-50%)',
        marginLeft: 3,
        marginTop: -9,
        backgroundColor: '#fff',
      }}
      railStyle={{
        backgroundColor: '#fff',
        height: 8,
      }}
    />
  );
};

InputSliderView.propTypes = {
  tipProps: PropTypes.object,
};

export default InputSliderView;

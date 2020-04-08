import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker/dist/DatePicker';

const DPicker = () => {

  const onChange = date => {
    console.log(date);
  };

  return (
    <DatePicker
      onChange={onChange}
      className={'b-datePicker'}
      // minDate={new Date()}
      // view={'decade'}
      // view={'year'}
      value={new Date()}
      locale={'en-EN'}
      calendarType={'US'}
      // showNeighboringMonth={false}
    />
  );
};

DPicker.propTypes = {};

export default DPicker;

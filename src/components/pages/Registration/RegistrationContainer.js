import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as validator from '../../../helpers/validator';
import RegistrationView from './RegistrationView';
import {trimFieldsData} from "../../../utils";

class RegistrationContainer extends Component {
  state = {
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    errors: {},
  };

  validator = {
    required: ['firstName', 'lastName', 'email', 'password'],
    custom: [
      validator.email(['email']),
      validator.password(['password']),
    ],
  };

  handleChange = ({target}) => {
    const field = target.name;
    this.setState({
      fields: {...this.state.fields, [field]: target.value},
      errors: {},
    });
  };

  handleSubmit = () => {
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, {...trimFieldsData(fields)});
    this.setState({errors});
    if (!Object.keys(errors).length) {
      alert('submit');
    }
  };

  render() {
    const {errors, fields} = this.state;

    return (
      <RegistrationView
        fields={fields}
        errors={errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

RegistrationContainer.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);

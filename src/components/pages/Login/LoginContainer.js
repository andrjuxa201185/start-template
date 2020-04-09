import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as validator from '../../../helpers/validator';
import {
  login,
} from '../../../store/auth/authActions';
import {trimFieldsData} from '../../../utils';
import LoginView from './LoginView';

class LoginContainer extends Component {
  state = {
    fields: {
      email: '',
      password: '',
    },
    errors: {},
  };

  validator = {
    required: ['email', 'password'],
    custom: [
      validator.email(['email']),
    ],
  };

  componentDidMount() {
    // this.props.login({});
    // window.addEventListener('keypress', this._handleKeyDown);
  }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('keypress', this._handleKeyDown);
  // }
  //
  // _handleKeyDown = e => {
  //   if (e.key === 'Enter') {
  //     this.handleSubmit(e);
  //   }
  // };

  handleChange = ({target}) => {
    const field = target.name;
    this.setState({
      fields: {...this.state.fields, [field]: target.value},
      errors: {},
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {fields} = this.state;
    const {errors} = validator.validate(this.validator, {...trimFieldsData(fields)});
    this.setState({errors});
    if (!Object.keys(errors).length) {
      this.props.login({...fields});
    }
  };

  render() {
    const {errors, fields} = this.state;

    return (
      <LoginView
        fields={fields}
        errors={errors}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login.request,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

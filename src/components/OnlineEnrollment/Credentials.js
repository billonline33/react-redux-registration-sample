import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength5 = minLength(5);
const minLength8 = minLength(8);
const maxLength30 = maxLength(30);
const maxLength15 = maxLength(15);
const userNameContainInvalidCharacters = value =>
  value && /[^a-zA-Z0-9$ :%.;*,"&?'#=!/\\_|(){}-]/.test(value)
    ? 'Invalid character, Password can only include - letter, number or special character $ :%.;*,"&?\'#=!/\\_|(){}-'
    : undefined;

const passwordContainInvalidCharacters = value =>
  value && /[^a-zA-Z0-9~!@#$%^*_+=-]/.test(value)
    ? 'Invalid character, Password can only include - uppercase letter, lowercase letter, number or special character ~!@#$%^*_+-='
    : undefined;

const containUppercaseLetter = value =>
  value && !/[A-Z]/.test(value)
    ? 'Password must constain at least one uppercase letter!'
    : undefined;

const containLowercaseLetter = value =>
  value && !/[a-z]/.test(value)
    ? 'Password must constain at least one lowercase letter!'
    : undefined;

const containNumber = value => {
  return value && !/[0-9]/.test(value)
    ? 'Password must constain at least one number!'
    : undefined;
};

const containSpecialCharacter = value =>
  value && !/[~!@#$%^*_+=-]/.test(value)
    ? 'Password must constain at least one special character ~!@#$%^*_+-=!'
    : undefined;

const userNameValidate = value => {
  var error = [];

  var validation = userNameContainInvalidCharacters(value);
  if (validation !== undefined) error.push(validation);

  validation = minLength5(value);
  if (validation !== undefined) error.push(validation);

  validation = maxLength30(value);
  if (validation !== undefined) error.push(validation);

  if (error.length > 0) return error;
  else return undefined;
};

const passwordValidate = value => {
  var error = [];
  var validation = containNumber(value);
  if (validation !== undefined) error.push(validation);

  validation = containLowercaseLetter(value);
  if (validation !== undefined) error.push(validation);

  validation = containUppercaseLetter(value);
  if (validation !== undefined) error.push(validation);

  validation = containSpecialCharacter(value);
  if (validation !== undefined) error.push(validation);

  validation = passwordContainInvalidCharacters(value);
  if (validation !== undefined) error.push(validation);

  validation = minLength8(value);
  if (validation !== undefined) error.push(validation);

  validation = maxLength15(value);
  if (validation !== undefined) error.push(validation);

  if (error.length > 0) return error;
  else return undefined;
};
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning, active }
}) => {
  return (
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />

      {(touched || active) &&
        ((error &&
          error.map((item, index) => {
            return (
              <div className="error" key={index}>
                {item}
              </div>
            );
          })) ||
          (warning && <span className="warning">{warning}</span>))}
    </div>
  );
};

class Credentials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notARobotVerfied: false
    };
    this.state = {
      passwordType: 'password',
      passwordNotMatch: false,
      passwordContainNumber: false
    };
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.notARobotVerfied = this.notARobotVerfied.bind(this);
    this.showHidePassword = this.showHidePassword.bind(this);
    this.checkPasswordMatching = this.checkPasswordMatching.bind(this);
    this.mySubmit = this.mySubmit.bind(this);
  }

  recaptchaLoaded() {
    console.log('recaptcha loaded');
  }

  notARobotVerfied(response) {
    if (response) {
      this.setState({
        notARobotVerfied: true
      });
    }
  }

  showHidePassword(e) {
    this.setState({
      passwordType: this.state.passwordType === 'input' ? 'password' : 'input'
    });
  }

  checkPasswordMatching() {
    var password =
      this.props.credentials.hasOwnProperty('values') &&
      this.props.credentials.values.hasOwnProperty('password')
        ? this.props.credentials.values.password
        : undefined;

    var confirmPassword =
      this.props.credentials.hasOwnProperty('values') &&
      this.props.credentials.values.hasOwnProperty('confirmPassword')
        ? this.props.credentials.values.confirmPassword
        : undefined;

    if (password && confirmPassword && password !== confirmPassword) {
      this.setState({
        passwordNotMatch: true
      });
    } else {
      this.setState({
        passwordNotMatch: false
      });
    }
  }

  mySubmit(values) {
    console.log('form submitted!', values);
    this.props.history.push('/onlineenrollment/personaldetails');
  }

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;
    const { passwordNotMatch } = this.state;
    return (
      <div className="form-registration">
        <form className="form" onSubmit={handleSubmit(this.mySubmit)}>
          <h4>Registration Form</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="mandatory" htmlFor="username">
                  Username
                </label>
                <p id="usernameHelp">
                  User name should not be an email address
                </p>
                <Field
                  component={renderField}
                  type="text"
                  name="userName"
                  label="Enter your name"
                  validate={userNameValidate}
                  required
                />
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="password">
                  Password
                </label>
                <span className="label-tag" onClick={this.showHidePassword}>
                  Show/Hide Password <i className="fas fa-eye fa-lg" />
                </span>

                <Field
                  component={renderField}
                  type={this.state.passwordType}
                  name="password"
                  label="Password"
                  validate={passwordValidate}
                  onBlur={this.checkPasswordMatching}
                />
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Field
                  component={renderField}
                  type="password"
                  name="confirmPassword"
                  label="Confirm password"
                  onBlur={this.checkPasswordMatching}
                />
              </div>
              {passwordNotMatch && (
                <span className="error">Password does not match!</span>
              )}
            </div>
            <div className="col-md-6">
              <div className="form-group form-registration-terms">
                <label>Terms &amp; Conditions</label>
              </div>
              <div className="panel">
                <p id="termsHelp" className="form-text">
                  Please click and agere to our Terms &amp; Conditions to enable
                  the checkbox
                </p>
                <ul className="list-simple">
                  <li>
                    <a href="https://help.github.com/en/github/site-policy/github-terms-of-service">
                      Terms and Conditions
                    </a>
                    &nbsp;
                    <i className="fas fa-check color-success" />
                  </li>
                  <li>
                    <a href="https://help.github.com/en/github/site-policy/github-privacy-statement">
                      Privacy Policy
                    </a>
                    &nbsp;
                    <i className="fas fa-check color-success" />
                  </li>
                </ul>

                <div className="form-group form-check d-flex flex-row align-items-center">
                  <Field
                    component="input"
                    type="checkbox"
                    className="form-check-input"
                    name="termsandConditions"
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="termsandConditions"
                  >
                    I accept by clicking on the above links.
                  </label>
                </div>
              </div>
              <div className="form-group form-recaptcha d-flex flex-row ">
                <Recaptcha
                  sitekey="6LcMZXUUAAAAAHRz8Bzy3gpUK2JSTQHP6-WJttgF"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.notARobotVerfied}
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="form-footer">
            <button
              type="submit"
              className="btn btn-default "
              disabled={pristine || submitting}
            >
              Next
            </button>
            <button type="button" className="btn" onClick={reset}>
              Clear Value
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Credentials = reduxForm({
  form: 'CredentialsEntryForm'
})(Credentials);

const mapStateToProps = state => {
  return {
    credentials: state.form.CredentialsEntryForm
  };
};

Credentials = connect(mapStateToProps, null)(Credentials);

export default withRouter(Credentials);

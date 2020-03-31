import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col, Form, InputGroup, Checkbox } from 'react-bootstrap';

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <input
      {...input}
      placeholder={label}
      type={type}
      className="form-control"
    />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

class PersonalDetails extends Component {
  render() {
    return (
      <Form className="form">
        <h4>Personal Information</h4>

        <Grid bsClass="">
          <Row>
            <Col md={6}>
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <Field
                  name="title"
                  component="select"
                  placeholder="Please select"
                  className="custom-select"
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Miss.</option>
                  <option>Mr.</option>
                  <option>Dr.</option>
                  <option>Prof.</option>
                </Field>
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="nameFirst">
                  First Name
                </label>
                <Field
                  component={renderField}
                  type="text"
                  name="nameFirst"
                  label="As on identity document"
                  required
                />
              </div>
              <div className="form-group">
                <Grid bsClass="">
                  <Row>
                    <Col md={4}>
                      <label className="mandatory" htmlFor="nameMiddle">
                        Middle Name
                      </label>
                    </Col>
                    <Col md={8}>
                      <Checkbox id="chkMiddleName">
                        <label
                          className="form-check-label"
                          htmlFor="chkMiddleName"
                        >
                          I have no other given name
                        </label>
                      </Checkbox>
                    </Col>
                  </Row>
                </Grid>

                <Field
                  component={renderField}
                  type="text"
                  name="nameMiddle"
                  label="As on identity document"
                  validate={maxLength15}
                  required
                />
              </div>

              <div className="form-group">
                <label className="mandatory" htmlFor="nameLast">
                  Last Name
                </label>
                <Field
                  component={renderField}
                  type="text"
                  name="nameLast"
                  label="As on identity document"
                  validate={maxLength15}
                  required
                />
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="gender">
                  Gender
                </label>
                <Field
                  name="gender"
                  component="select"
                  placeholder="Please select"
                  className="custom-select"
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Field>
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="dob">
                  Date of Birth
                </label>
                <InputGroup>
                  <Field
                    component="input"
                    type="text"
                    name="dob"
                    className="form-control"
                    placeholder="DD-MMM-YYYY"
                  />
                </InputGroup>
              </div>

              <hr />

              <div className="form-group">
                <label className="mandatory" htmlFor="email">
                  Email Address
                </label>
                <p>
                  Your account related notification will be sent to the email
                  address.
                </p>
                <Field
                  component="input"
                  type="text"
                  className="form-control"
                  name="email"
                  // placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <label className="mandatory" htmlFor="emailConfirm">
                  Confirm Email Address
                </label>
                <Field
                  component="input"
                  type="text"
                  className="form-control"
                  name="emailConfirm"
                  required
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="form-group">
                <label className="mandatory" htmlFor="securityAuestion">
                  Security Question
                </label>
                <Field
                  name="securityAuestion"
                  component="select"
                  placeholder="Please select"
                  className="custom-select"
                >
                  <option value="" disabled>
                    Please select
                  </option>
                  <option>What's your first pet's name?</option>
                  <option>What is your credit card number?</option>
                  <option>What is your bank account pin code?</option>
                </Field>
              </div>

              <div className="form-group">
                <label className="mandatory" htmlFor="secretAnswer">
                  Secret Answer
                </label>
                <Field
                  component="input"
                  type="text"
                  className="form-control"
                  name="secretAnswer"
                  placeholder=""
                  required
                />
              </div>
              <hr />

              <div className="panel">
                <Checkbox id="chkTermsConditions">
                  <label htmlFor="chkTermsConditions">
                    By clicking here, you confirm that you have read the terms
                    and conditions, that you understand them and that you agree
                    to be bound by them.
                  </label>
                </Checkbox>
              </div>
            </Col>
          </Row>
        </Grid>

        <hr />
        <div className="form-footer">
          <button type="submit" className="btn">
            Next
          </button>
        </div>
      </Form>
    );
  }
}

PersonalDetails = reduxForm({
  form: 'PersonalDetailsEntryForm'
})(PersonalDetails);

export default PersonalDetails;

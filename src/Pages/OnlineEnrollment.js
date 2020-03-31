import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Credentials from '../components/OnlineEnrollment/Credentials';
import PersonalDetails from '../components/OnlineEnrollment/PersonalDetails';

class OnlineEnrollment extends Component {
  render() {
    return (
      <div className="main container-fluid">
        <div className="container">
          <Grid bsClass="">
            <Row>
              <Col md={9}>
                <Route
                  path="/onlineenrollment/Credentials"
                  render={props => {
                    return <Credentials />;
                  }}
                />
                <Route
                  path="/onlineenrollment/personaldetails"
                  component={PersonalDetails}
                />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default OnlineEnrollment;

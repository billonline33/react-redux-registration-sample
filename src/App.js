import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import OnlineEnrollment from './Pages/OnlineEnrollment';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="wrapper">
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Redirect to="/onlineenrollment/Credentials" />;
              }}
            />
            <Route path="/onlineenrollment" component={OnlineEnrollment} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

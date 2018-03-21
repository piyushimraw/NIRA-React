import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Dashboard from "./Components/dashboard"
import LoginForm from './Components/LoginForm';
import Navigation from './Components/Navigation';
import { firebase } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        authUser: null,
      };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser =>{
      authUser ? this.setState(() =>({ authUser })) : this.setState(() =>({ authUser : null }));
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Navigation authUser={this.state.authUser}/>

          <Route
            path="/login"
            component={() => <LoginForm />}
          />
          <Route
            path="/dashboard"
            component={() => <Dashboard />}
          />
          <Route
            path="/"
            exact component={() => <LoginForm />}
          />
        </div>
      </Router>
    )
  }
}

export default withRouter(App);

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from "./Components/dashboard"
import LoginForm from './Components/LoginForm';

class App extends Component {
  render() {
    return (
          <div>
            <Route path="/login" component={LoginForm} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={LoginForm} />
          </div>
      // <LoginForm />
      // <Dashboard />
    )
  }
}

export default App;

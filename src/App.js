import React, { Component } from 'react';
import {BrowserRouter as Router, Route, withRouter,Switch } from 'react-router-dom';
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

  componentWillMount() {
    //TODO 
    // * Check if onAuthStateChanged is emiting any change on logout
    // * if not follow  https://stackoverflow.com/questions/37603118/firebase-auth-onauthstatechanged-not-working
    //
    //
    firebase.auth.onAuthStateChanged(authUser =>{
      console.log(authUser);
      authUser ? this.setState(() =>({ authUser })) : this.setState(() =>({ authUser : null }));
    });
  }

  render() {
    return (
      // // <Router>
        <div>
           <Navigation authUser={this.state.authUser}/>
        </div>

      //     //not setting up the routes setting the route re render 
      //    the component hence double component problem.
      
      //     // {/* <Route
      //     //   path="/login"
      //     //  exact component={() => <LoginForm />}
      //     // />
      //     // {/* <Route
      //     //   path="/dashboard"
      //     //   component={() => <Dashboard />}
      //     // /> */}
      //     // {/* <Route
      //     //   path="/"
      //     //   exact component={() => <LoginForm />}
      //     // /> */} 
        
      // // </Router>

    )
  }
}

export default (App);

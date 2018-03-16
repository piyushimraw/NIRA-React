import React, { Component } from 'react';
// import {withRouter} from "react-router-dom";

import '../LoginForm.css';
import 'font-awesome/css/font-awesome.min.css';
import waterBackground from '../images/backgroundWater.jpg';
import { auth } from '../firebase';

const STATE = {
  email: '',
  password: '',
  error: null,
};

const byPropKey = (key, value) => () => ({
    [key]: value,
});

class LoginForm extends Component {

    constructor (){
        super();
        this.state = { ...STATE };
        this.submitForm = this.submitForm.bind(this);
    }

  submitForm(event){
    const{
      email,
      password
    } = this.state;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...STATE }));
        this.props.history.push('/dashboard');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = password === '' || email === '';

    const bgStyle = {
      backgroundImage: 'url(' + waterBackground + ')',
      backgroundColor: 'rgb(255, 255, 255)'
    };

    return (
      <div className="LoginForm">
          <div style={bgStyle}>
              <div className="form-card-container">
                  <div className="form-card">
                      <div className="form-wrapper">
                          <form className="login-form" onSubmit={this.submitForm}>
                              <span className="login-form-logo">
                              <i className="fa fa-tint"></i>
                              </span>

                              <span className="login-form-title">
                                  Log In
                              </span>

                              <div className="input-wrapper validate-input" data-validate="Enter Username">
                                  <i className="fa fa-user"></i>
                                  <input
                                    value={email}
                                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                                    className="input-field"
                                    type="email"
                                    name="Email"
                                    placeholder="Email"
                                    />
                              </div>

                              <div className="input-wrapper validate-input" data-validate="Enter Password">
                                  <i className="fa fa-lock"></i>
                                  <input
                                    value={password}
                                    onChange={event => this.setState(byPropKey('password', event.target.value))}
                                    className="input-field"
                                    type="password"
                                    name="Password"
                                    placeholder="Password"/>
                              </div>

                              <div className="button-wrapper">
                						      <button disabled={isInvalid} className="button-field" type="submit">
                							        Login
                						      </button>
                					    </div>
                              { error && <p className="error-message">{error.message}</p> }
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default  LoginForm;

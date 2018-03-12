import React, { Component } from 'react';
// import {withRouter} from "react-router-dom";

import '../LoginForm.css';
import 'font-awesome/css/font-awesome.min.css';
import waterBackground from '../images/backgroundWater.jpg';

class LoginForm extends Component {

    constructor (){
        super();
        this.submitForm = this.submitForm.bind(this);
    }

  submitForm(e){
    /*TODO Implement this function*/
    e.preventDefault();
    console.log("Form Submitted!");
    this.props.history.push('/dashboard')   
  }

  render() {
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
                                  <input className="input-field" type="text" name="Username" placeholder="Username"/>
                              </div>

                              <div className="input-wrapper validate-input" data-validate="Enter Password">
                                  <i className="fa fa-lock"></i>
                                  <input className="input-field" type="password" name="Password" placeholder="Password"/>
                              </div>

                              <div className="button-wrapper">
                						      <button className="button-field">
                							        Login
                						      </button>
                					    </div>
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

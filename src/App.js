import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <form >
      <label>Username:
      <input type="text" value=""/>
      </label>
      <label>Password:
      <input type="password" value=""/>
      </label>
      </form>
    );
  }
}

export default App;

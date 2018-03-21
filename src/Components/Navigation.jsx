import React from 'react';
import Dashboard from './dashboard';
import LoginForm from './LoginForm';

const Navigation = ({authUser}) =>
  <div>
    {
      authUser ? <NavigationAuth /> : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <div>
    <Dashboard />
  </div>

const NavigationNonAuth = () =>
  <div>
    <LoginForm />
  </div>

export default Navigation;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LoginRoute = ({ component, ...rest }) => {
  if (!component) {
    return null;
  }
  const isAuthorized = localStorage.getItem('token');
  const Component = component;
  // eslint-disable-next-line no-console
  // console.log(JSON.parseisAuthorized, 'isAuthorized');

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      exact
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to={{ pathname: '/signin' }} />)}
    />
  );
};

export default LoginRoute;

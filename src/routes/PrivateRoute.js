import React from 'react';

import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component, ...rest }) => {
  const isAuthorized = localStorage.getItem('token');

  if (!component) {
    return null;
  }
  const Component = component;

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // eslint-disable-next-line react/jsx-props-no-spreading
      render={(props) => (isAuthorized ? <Component {...props} /> : <Redirect to={{ pathname: '/signin' }} />)}
    />
  );
};
export default PrivateRoute;

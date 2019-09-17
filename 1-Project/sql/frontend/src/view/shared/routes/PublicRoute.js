import PermissionChecker from 'modules/auth/permissionChecker';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PublicRoute({
  component: Component,
  currentUser,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const permissionChecker = new PermissionChecker(
          currentUser,
        );

        if (permissionChecker.isAuthenticated) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default PublicRoute;

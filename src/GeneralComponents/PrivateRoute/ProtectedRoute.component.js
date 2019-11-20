import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, isAuth, path, ...rest }) => {
    return(
        <Route 
          path={path}
          {...rest}
          render={props => {
            return isAuth ? (
              <Comp {...props} />
            ) : (
              <Redirect to={{
                pathName: "/",
                state: {
                  prevLocation: path,
                  error: "UnAuthorized Access!",
                }
              }}
              />
            )
          }}
        />
    )
}
 
export default ProtectedRoute;
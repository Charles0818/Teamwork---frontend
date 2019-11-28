import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, auth, path, ...rest }) => {
  const isAuth = auth();
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
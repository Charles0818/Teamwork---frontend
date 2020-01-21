import React, { useContext } from 'react';
import { UsersContext } from '../context/usersContext';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Comp, auth, path, ...rest }) => {
  const usersContext = useContext(UsersContext);
  const { users, addUser } = usersContext;
  const isAuth = auth();
    return(
        <Route 
          path={path}
          {...rest}
          render={props => {
            return isAuth ? (
              <Comp users={users} addUser={addUser} {...props} />
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
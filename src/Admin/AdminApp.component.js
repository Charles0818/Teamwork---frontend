import React, { useContext, useEffect, useState } from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker'
import Navbar from '../GeneralComponents/Navbar/Navbar.component';
import AdminDashboard from './Dashboard/dashboard';
import ListEmployees from './ListEmployees/ListEmployees.component';
import { UserContext } from '../GeneralComponents/context/userContext';
import { getData, apiKey } from '../GeneralComponents/AJAX/HttpRequest';
import { addDefaultAvatar } from '../GeneralComponents/context/addDefaultAvatar';

const AdminApp = (props) => {
  const { users, addUser, history: { push }, match: { path } } = props;
  const { data: { userId, token } } = useContext(UserContext);
  useEffect(() => {
    if(users.length === 0) {
      trackPromise(
        getData(`${apiKey}/auth/users`, userId, token)
        .then(res => {
          let { data } = res;
          data = data.map(user => addDefaultAvatar(user))
          console.log(data)
          addUser(data);
          push(`${path}/dashboard`)
        }).catch(err => {
          console.log(err);
        })
      )
    }else return 
  }, [addUser, path, push, token, userId, users.length])
    
  return (
    <Router>
      <Route path={`${path}`} component={Navbar} />
        <Switch>
          <Route exact path={`${path}/dashboard`} component={AdminDashboard} />
          <Route exact path={`${path}/employees`}
            render={(props) => <ListEmployees users={users} addUser={addUser} userData={{token, userId}} {...props} /> } />
        </Switch>
    </Router>
  );
}

export default withRouter(AdminApp);
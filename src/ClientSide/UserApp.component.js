import React, { useEffect, useContext } from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import Dashboard from './DashboardComponent/dashboard.component';
import Profile from './Profile/profile.component';
import EditProfile from './Profile/ProfileEdit.component';
import ViewUserProfile from './Profile/ViewUserProfile.component';
import Navbar from '../GeneralComponents/Navbar/Navbar.component';
import { UserContext } from '../GeneralComponents/context/userContext';
import { getData, apiKey } from '../GeneralComponents/AJAX/HttpRequest';
import { addDefaultAvatar } from '../GeneralComponents/context/addDefaultAvatar';
import FeedContextProvider from '../GeneralComponents/context/feedContext';

const UserApp = (props) => {
  const { users, addUser, history: { push }, match: { path, params } } = props;
  const { updateAccount, data, data: { userId, token } } = useContext(UserContext);
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
    <React.Fragment>
      <FeedContextProvider>
        <Router>
          <Route path={`${path}/dashboard`} component={Navbar} />
          <Switch>
            <Route exact path={`${path}/profile/edit`}
              render={(props) => <EditProfile updateAccount={updateAccount} userData={data} users={users} addUser={addUser} {...props} />}
            />
            <Route exact path={`${path}/profile`}
              render={(props) => <Profile updateAccount={updateAccount} userData={data} {...props} />}
            />
            <Route path={`${path}/dashboard`}
              render={(props) => <Dashboard  userData={{data}} updateAccount={updateAccount} {...props} />}
            />
            <Route exact path={`${path}/:username`}
              render={(props) => <ViewUserProfile key={params.username} userData={{userId, token}} {...props} />}
            />
          </Switch>
        </Router>
      </FeedContextProvider>
    </React.Fragment>
  );
}

export default withRouter(UserApp);
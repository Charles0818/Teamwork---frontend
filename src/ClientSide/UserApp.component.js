import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './DashboardComponent/dashboard.component';
import AdminApp from '../Admin/AdminApp.component';
import Profile from './Profile/profile.component';
import EditProfile from './Profile/ProfileEdit.component';
import ViewUserProfile from './Profile/ViewUserProfile.component';
import Navbar from '../GeneralComponents/Navbar/Navbar.component';
import { UserContext } from '../GeneralComponents/context/userContext';
class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  static contextType = UserContext;

  render() {
    const { updateAccount, data } = this.context;
    const { userId, token } = data;
    const { match } = this.props;
    return ( 
      <React.Fragment>
        <Router>
          <Route path={`${match.path}/dashboard`} component={Navbar} />
          <Switch>
            <Route exact path={`${match.path}/profile/edit`}
              render={(props) => <EditProfile updateAccount={updateAccount} userData={data} {...props} />}
            />
            <Route exact path={`${match.path}/profile`}
              render={(props) => <Profile updateAccount={updateAccount} userData={data} {...props} />}
            />
            <Route exact path={`${match.path}/dashboard`}
              render={(props) => <Dashboard  userData={{data}} updateAccount={updateAccount} {...props} />}
            />
            <Route exact path={`${match.path}/:username`}
              render={(props) => <ViewUserProfile authToken={token} userId={userId} {...props} />}
            />
            <Route path="/admin" component={AdminApp} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default UserApp;
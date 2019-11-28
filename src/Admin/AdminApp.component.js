import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Navbar from '../GeneralComponents/Navbar/Navbar.component';
import AdminDashboard from './Dashboard/dashboard';
import ListEmployees from './ListEmployees/ListEmployees.component';
// import Profile from '../ClientSide/Profile/profile.component';
// import Dashboard from '../ClientSide/DashboardComponent/dashboard.component';
import UserApp from '../ClientSide/UserApp.component';
import { UserContext } from '../GeneralComponents/context/userContext';
class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  static contextType = UserContext;
  render() {
    const { data: { token, userId } } = this.context;
    const { match } = this.props;
    return (
      <Router>
        <Route path={`${match.path}`} component={Navbar} />
          <Switch>
            <Route exact path={`${match.path}/dashboard`} component={AdminDashboard} />
            <Route exact path={`${match.path}/dashboard/employees`}
              render={(props) => <ListEmployees userData={{token, userId}} {...props} /> } />
            <Route path="/user" component={UserApp} />
          </Switch>
      </Router>
    );
  }
}

export default AdminApp;
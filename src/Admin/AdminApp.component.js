import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import Navbar from '../GeneralComponents/Navbar/Navbar.component';
import AdminDashboard from './Dashboard/dashboard';
import ListEmployees from './ListEmployees/ListEmployees.component';
// import UserApp from '../ClientSide/UserApp.component';
import { UserContext } from '../GeneralComponents/context/userContext';
import { getData, apiKey } from '../GeneralComponents/AJAX/HttpRequest';
import { addDefaultAvatar } from '../GeneralComponents/context/addDefaultAvatar';

class AdminApp extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  static contextType = UserContext;

  componentWillMount() {
    this._isMounted = true;
    const { users, addUser, history: { push }, match: { path } } = this.props;
    console.log(this.props);
    if(users.length === 0) {
      const { data:  { userId, token } } = this.context;
      getData(`${apiKey}/auth/users`, userId, token)
      .then(res => {
        let { data } = res;
        data = addDefaultAvatar(data);
        addUser(data);
        push(`${path}/dashboard`)
      }).catch(err => {
        console.log(err);
      })
    }else return 
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { data: { token, userId } } = this.context;
    const { match, users, addUser } = this.props;
    return (
      <Router>
        <Route path={`${match.path}`} component={Navbar} />
          <Switch>
            <Route exact path={`${match.path}/dashboard`} component={AdminDashboard} />
            <Route exact path={`${match.path}/employees`}
              render={(props) => <ListEmployees users={users} addUser={addUser} userData={{token, userId}} {...props} /> } />
            {/* <Route path="/user" component={UserApp} /> */}
          </Switch>
      </Router>
    );
  }
}

export default withRouter(AdminApp);
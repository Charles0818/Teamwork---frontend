import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.css';

//Components
import LandingPage from './Landing_page/LandingPage.component';
import ChatApp from './ClientSide/ChatApp/index';
import UserApp from './ClientSide/UserApp.component';
import AdminApp from './Admin/AdminApp.component';
import ProtectedRoute from './GeneralComponents/PrivateRoute/ProtectedRoute.component';

//Context
import UserContextProvider from './GeneralComponents/context/userContext';
import UsersContextProvider from './GeneralComponents/context/usersContext';
import  { IsAuth, IsAdmin } from './GeneralComponents/context/auth.component';

library.add(far, fab, fas);

class App extends Component {
  render () {
    return (
      <Router>
        <UserContextProvider>
          <UsersContextProvider>
              <Route path="/" exact component ={LandingPage} />
              <Switch>
                <ProtectedRoute path="/user" auth={IsAuth} component={UserApp} />
                <ProtectedRoute path="/admin" auth={IsAdmin} component={AdminApp} />
                <ProtectedRoute path="/chats" auth={IsAuth} component={ChatApp} />
              </Switch>
          </UsersContextProvider>
        </UserContextProvider>
      </Router>
    )
  }
}

export default App;

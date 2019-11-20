import React, { Component } from 'react';
import {BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import './App.css';

//Components
import LandingPage from './Landing_page/LandingPage.component';
// import Navbar from './GeneralComponents/Navbar/Navbar.component';
import Dashboard from './ClientSide/DashboardComponent/dashboard.component';
import AdminDashboard from './Admin/Dashboard/dashboard';
import ProtectedRoute from './GeneralComponents/PrivateRoute/ProtectedRoute.component';

//User Context
import { UserContextProvider } from './GeneralComponents/context/userContext';
import  { UseAuth, isAdmin, isAuth } from './GeneralComponents/context/auth.component';

library.add(far, fab, faCheckSquare, faCoffee);

class App extends Component {
  render () {
    return (
      <UserContextProvider>
        <Router>
          <Route path="/" exact component ={LandingPage} />
          <ProtectedRoute path="/user" isAuth={true} component={Dashboard} />
            <React.Fragment>
                <Switch>
                  <Route exact path ="/user/dashboard" component={Dashboard} />
                  <ProtectedRoute path="/admin/" isAuth={isAuth() && isAdmin()} component={AdminDashboard} />
                </Switch>
            </React.Fragment>
        </Router>
      </UserContextProvider>
    )
  }
}

export default App;

import React, { Component } from 'react';
import '../Sidebars/sidebar.style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LeftSidebar from '../Sidebars/LeftSidebar.component';
import RightSidebar from '../Sidebars/RightSidebar.component';
import MainContent from '../MainContent/MainContent.component';
import { getData, apiKey } from '../../GeneralComponents/AJAX/HttpRequest';
import { addDefaultAvatar } from '../../GeneralComponents/context/addDefaultAvatar';
import { UsersContext } from '../../GeneralComponents/context/usersContext';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
     }
  }

  static contextType = UsersContext;

  UNSAFE_componentWillMount() {
    const { users, addUser } = this.context;
    if(users.length <= 0) {
      const { data:  { userId, token } } = this.props.userData;
      getData(`${apiKey}/auth/users`, userId, token)
      .then(res => {
        let { status, data } = res;
        data = addDefaultAvatar(data)
        addUser(data)
      }).catch(err => {
        console.log(err);
      })
    }else return
  }

  render() {
    const { updateAccount, userData } = this.props;
    console.log(userData);
    const { data: {photoDetails, interests} } = userData;
    return (
      <Router>
        <section className="page-section d-flex">
          <LeftSidebar userData = {{ photoDetails, interests }} updateAccount={updateAccount} />}
          <Route path={this.props.path} component={ MainContent } />
          <RightSidebar />
        </section>
      </Router>
    );
  }
}

export default Dashboard;
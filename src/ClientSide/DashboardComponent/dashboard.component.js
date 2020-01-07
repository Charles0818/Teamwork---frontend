import React, { useEffect, useContext } from 'react';
import '../Sidebars/sidebar.style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import LeftSidebar from '../Sidebars/LeftSidebar.component';
import RightSidebar from '../Sidebars/RightSidebar.component';
import MainContent from '../MainContent/MainContent.component';
import { getData, apiKey } from '../../GeneralComponents/AJAX/HttpRequest';
import { addDefaultAvatar } from '../../GeneralComponents/context/addDefaultAvatar';
import { UsersContext } from '../../GeneralComponents/context/usersContext';

const Dashboard = (props) =>  {
 const {  users, addUser  } = useContext(UsersContext);
 const { match: { path }, updateAccount, userData: { data:  { userId, token, photoDetails, interests } } } = props;
 useEffect(() => {
  if(users.length <= 0) {
    getData(`${apiKey}/auth/users`, userId, token)
    .then(res => {
      let { data } = res;
      data = addDefaultAvatar(data)
      addUser(data);
    }).catch(err => {
      console.log(err);
    })
  }else return
 })

  return (
    <Router>
      <section className="page-section d-flex">
        <LeftSidebar path={path} userData = {{ photoDetails, interests }} updateAccount={updateAccount} />
        <Route path={path} component={ MainContent } />
        <RightSidebar userId={userId} />
      </section>
    </Router>
  );
}

export default Dashboard;
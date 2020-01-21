import React from 'react';
import '../Sidebars/sidebar.style.css';
import { HashRouter as Router, Route } from 'react-router-dom';
import LeftSidebar from '../Sidebars/LeftSidebar.component';
import RightSidebar from '../Sidebars/RightSidebar.component';
import MainContent from '../MainContent/MainContent.component';
const Dashboard = (props) =>  {
 const { match: { path }, updateAccount, userData: { data:  { userId, photoDetails, interests } } } = props;
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
import React, { Component } from 'react';
import '../Sidebars/sidebar.style.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//components
import Navbar from '../../GeneralComponents/Navbar/Navbar.component';
import LeftSidebar from '../Sidebars/LeftSidebar.component';
import RightSidebar from '../Sidebars/RightSidebar.component';
import MainContent from '../MainContent/MainContent.component';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <React.Fragment>
                <Router>
                    <Route path="/user/dashboard" component={Navbar} />
                    <section className="page-section d-flex">
                        <LeftSidebar />
                        <MainContent />
                        <RightSidebar />
                    </section>
                </Router>
            </React.Fragment>
         );
    }
}
 
export default Dashboard;
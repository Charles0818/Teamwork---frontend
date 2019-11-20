import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './mainContent.style.css';
//components
import NewsFeed from './NewsFeed/NewsFeed.component';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <main className="main">
                <div className="content-wrapper">
                    
                    <Router>
                        <Switch>
                            <Route path="/" component = {NewsFeed}/>
                            {/* <Route path='/:feedId' component= {} /> */}
                        </Switch>
                    </Router>
                </div>
            </main>
        );
    }
}
 
export default MainContent;
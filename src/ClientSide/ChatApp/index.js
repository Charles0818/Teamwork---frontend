import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import ChatUI from './ChatUI/index';
import GroupUI from './GroupUI/index'
import './chat.styles.css'
const ChatApp = (props) => {
    const { match: { path } } = props;
    return (
    <Router>
        <Switch>
            <Route exact path={`${path}/messages`} component={ChatUI} />
            <Route exact path={`${path}/groups`} component={GroupUI} />
        </Switch>
    </Router>
    )
}

export default ChatApp
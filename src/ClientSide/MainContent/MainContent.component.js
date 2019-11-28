import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FeedContextProvider, { FeedConsumer } from '../../GeneralComponents/context/feedContext';
import './mainContent.style.css';
//components
import NewsFeed from './NewsFeed/NewsFeed.component';
import SingleContent from './NewsFeed/singleContent.component';

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
            <FeedContextProvider>
              <FeedConsumer>
                {({updateFeed, feed}) => (
                  <Switch>
                      <Route render={(props) => <NewsFeed path={`${props.match.path}`} updateFeed={updateFeed} feed={feed} />} />
                      <Route path={"/articles/:articleId" || "/gifs/:gifId"} component={SingleContent} />
                  </Switch>
                )}
              </FeedConsumer>
            </FeedContextProvider>
              {/* <Route path='/:feedId' component= {} /> */}
          </Router>
        </div>
      </main>
    );
  }
}

export default MainContent;
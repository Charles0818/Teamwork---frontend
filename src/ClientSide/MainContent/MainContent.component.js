import React, { useContext } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { FeedConsumer } from '../../GeneralComponents/context/feedContext';
import { UserContext } from '../../GeneralComponents/context/userContext';
import './mainContent.style.css';
//components
import NewsFeed from './NewsFeed/NewsFeed.component';
import SingleContent from './NewsFeed/singleContent.component';

const MainContent = (props) => {
  const { data: { userId, token } } = useContext(UserContext);
  const { match: { path } } = props;
  return (
    <main className="main">
      <div className="content-wrapper">
        <Router>
          <FeedConsumer>
            {({updateFeed, feed}) => (
              <Switch>
                <Route exact path={`${path}`} render={(props) => <NewsFeed updateFeed={updateFeed} feed={feed} props={{...props}} />} />
                <Route path={`${path}/articles/:articleId`}
                  render={(props) => <SingleContent userData={{ userId, token }} updateFeed={updateFeed} allFeed={feed} props={{...props}} />}
                />
                <Route path={`${path}/gifs/:gifId`}
                  render={(props) => <SingleContent userData={{ userId, token }} updateFeed={updateFeed} allFeed={feed} props={{...props}} />}
                />
              </Switch>
            )}
          </FeedConsumer>
        </Router>
      </div>
    </main>
  );
}

export default MainContent;
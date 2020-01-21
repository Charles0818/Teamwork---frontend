import React, { createContext } from 'react';
// import { FeedContext } from '../FormComponent/login.component';

export const SingleFeedContext = createContext();
export const SingleFeedConsumer = SingleFeedContext.Consumer;
class SingleFeedContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      singleFeed: {},
      updateSingleFeed: changes => this.updateSingleFeed(changes)
    }
  }

  updateSingleFeed = changes => {
    this.setState({
      singleFeed: changes
    })
  }

  render() {
    console.log(this.state)
    return (
      <SingleFeedContext.Provider value={this.state}>
        {this.props.children}
      </SingleFeedContext.Provider>
    )
  }
}
export default SingleFeedContextProvider;


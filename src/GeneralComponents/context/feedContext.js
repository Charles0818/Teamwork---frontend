import React, { createContext } from 'react';
// import { FeedContext } from '../FormComponent/login.component';

export const FeedContext = createContext();
export const FeedConsumer = FeedContext.Consumer;
class FeedContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      updateFeed: changes => this.updateFeed(changes)
    }
  }

  updateFeed = changes => {
    this.setState({
      feed: [...changes]
    })
  }

  render() {
    console.log(this.state)
    return (
      <FeedContext.Provider value={this.state}>
        {this.props.children}
      </FeedContext.Provider>
    )
  }
}


export default FeedContextProvider;
import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { getData, apiKey } from '../../../GeneralComponents/AJAX/HttpRequest'

import Content from './Content.component';
import Modal from '../../../GeneralComponents/modalComponent/modal.component';
import CreateContent from '../../../GeneralComponents/FormComponent/CreatePostComponent/CreateContent.component';
import { UserContext } from '../../../GeneralComponents/context/userContext';
import { displayIfEmpty } from '../../../GeneralComponents/displayMessage/displayIfEmpty'
class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isModalOpen: false,
      feed: this.props.feed
    }
  }

  static contextType  = UserContext;

  toggleModal = (event)=> {
    event.preventDefault();
    const target = event.target;
    console.log(target);
    const targetClassList = [...target.classList];
    console.log(targetClassList);
    (targetClassList.includes('close')) ? (
      this.setState({isModalOpen: false })
      ) : (
        this.setState({ isModalOpen: true})
        )
    console.log(this.state.isModalOpen);
  }

  componentDidMount() {
    const { data: { token, userId } } = this.context;
    let { updateFeed, feed } = this.props;
    if (feed.length === 0) {
      trackPromise(
        getData(`${apiKey}/feed`, userId, token)
        .then(res => {
          const { status, data } = res;
          feed = [...data, ...feed];
          this.setState({
            feed: [...feed]
          })
          updateFeed(feed)
            console.log(res);
        }).catch(err => {
            console.log(err)
        })
      );
    } else return 
  }

  renderFeed = (feed) => {
    const { data: { userId, firstName, lastName } } = this.context
    if (feed.length !== 0) {
      return feed.map((feed, index) => <Content key={index} feed={feed} userData={{userId, firstName, lastName}}/>)
    }
    else return displayIfEmpty("No post to show!!! Why not be the first to own a content? Click the plus button above")
  }

  render() {
    const { feed } = this.state;
    return ( 
      <div>
        <div className="create--post margin-bottom-md">
          <i className="fas fa-plus-circle font-xlg action" onClick={(event) => this.toggleModal(event)}></i>
        </div>
        <section className="news-feed">
          {this.renderFeed(feed)}
        </section>
        <Modal toggleModal = {this.toggleModal} isModalOpen = {this.state.isModalOpen} contentTitle ="" contentBody = {<CreateContent />} />
      </div>
    );
  }
}

export default NewsFeed;
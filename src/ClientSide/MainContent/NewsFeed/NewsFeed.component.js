import React, { useEffect, useContext } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { getData, apiKey } from '../../../GeneralComponents/AJAX/HttpRequest'
import { assignProperties } from '../../../GeneralComponents/HelperFunctions/feed';
import Content from './Content.component';
import CreateContent from '../../../GeneralComponents/FormComponent/CreatePostComponent/CreateContent.component';
import { UserContext } from '../../../GeneralComponents/context/userContext';
import { displayIfEmpty } from '../../../GeneralComponents/displayMessage/displayIfEmpty';
import useModal from '../../../GeneralComponents/modalComponent/toggleModal';

const  renderFeed = (feed, props, data) => {
  const { userId, firstName, lastName, token } = data;
  const { feed: allFeed, updateFeed } = props;
  if (feed.length !== 0) {
    return feed.map((feed, index) => <Content key={index} feed={feed} allFeed={allFeed} updateFeed={updateFeed} userData={{userId, firstName, lastName, token}}/>)
  }
  else return displayIfEmpty("No post to show!!! Why not be the first to own a content? Click the plus button above")
}

const NewsFeed = (props) => {
  let { updateFeed, feed } = props;
  const { data } = useContext(UserContext);
  const { openModal, ModalChild } = useModal('', CreateContent);
  console.log(openModal, ModalChild);

  useEffect(() => {
    const { token, userId }  = data;
    let { feed } = props;
    if (feed.length === 0) {
      trackPromise(
        getData(`${apiKey}/feed`, userId, token)
        .then(res => {
          const { data: { content, comments, flags } } = res;
          feed = [...assignProperties(content, comments, flags), ...feed]
          updateFeed(feed)
        }).catch(err => {
            console.log(err)
        })
      );
    } else return 
  })

  return ( 
    <div>
      <div className="create--post margin-bottom-md">
        <i className="fas fa-plus-circle font-xlg action" onClick={openModal}></i>
      </div>
      <section>
        {renderFeed(feed, props, data)}
      </section>
      {ModalChild}
    </div>
  );
}

export default NewsFeed;
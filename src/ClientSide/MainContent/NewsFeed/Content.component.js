import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import { deleteData, getData, modifyData, apiKey } from '../../../GeneralComponents/AJAX/HttpRequest';
import Comments from '../Comments/Comments.component';
import ModifyArticle from '../../../GeneralComponents/FormComponent/ModifyPostComponent/ModifyArticle';
import { UsersContext } from '../../../GeneralComponents/context/usersContext';
import { checkIfUserFlagged } from '../../../GeneralComponents/HelperFunctions/feed';
import '../mainContent.style.css';
import useModal from '../../../GeneralComponents/modalComponent/toggleModal';


const contentType = (type, id, content, title) => {
  switch(type) {
    case 'article' :
      return (
        <div className="text-content padding-bottom-sm">
          <p className="font-weight-bold font-md padding-bottom-sm">
            {title}
          </p>
          <p className="font-sm" style={{overflowY: 'hidden', maxHeight: '150px'}}>{content[0]}</p>
          <Link to={`/user/dashboard/articles/${id}`}>
            <span className='padding-sm paint-text font-weight-bold'>...Read More</span>
          </Link>
        </div>
      )
    case 'gif' :
      return (
        <div className="padding-bottom-sm">
          <p className="font-weight-bold font-sm padding-bottom-md">
            {title}
          </p>
          <div className="d-flex justify-content--center align-items--center padding-bottom-md">
            <div className="" style={{width: '70%', height: '150px', overflow: 'hidden'}}>
              <img className="" style={{width: '100%', height: 'auto'}}
                src={content[0]} publicid = {content[1]}
                alt="poster avatar"
              />
            </div>
          </div>
          <Link to={`/user/dashboard/gifs/${id}`}>
            <span className='padding-md paint-text font-weight-bold'>...View full size</span>
          </Link>
        </div>
      )
    default:
      break;
  }
}

const Content = (props) =>  {
  const [flagStats, setFlagStats] = useState(props.feed.flagStat);
  let { users } = useContext(UsersContext);
  const { feed: { id, type, content, title, category, userid, comments, createdon: createdOn },
  allFeed, updateFeed, userData: { userId, token } } = props;
  users = users.map(user => {
    const { employeeId, photoDetails, firstName, lastName } = user;
    return { employeeId, photoDetails, firstName, lastName }
  });
  const author = users.find(user => user.employeeId === userid);
  const { photoDetails, firstName, lastName, employeeId: authorId } = author;
  const Comments_props = { comments, feedId: id, users, feedType: type };
  const contentProps = {
    title, article: content[0], category,
   articleId: id, userData: {userId, token},
  }

  const {
    openModal, ModalChild
  } = useModal('Modify Article', ModifyArticle, contentProps);

  const {
    openModal: openModal_Comments, ModalChild: ModalChild_Comments
  } = useModal('View Comments', Comments, Comments_props);

  const fetchFlagStats =() => {
    getData(`${apiKey}/feed/${id}/flagStats`, userId, token )
    .then(res => {
      const { data: { flagStats } } = res;
      setFlagStats(flagStats);
    }).catch(err => {
      console.log(err)
    })
  }

  const flag = (event) => {
    event.preventDefault();
    const { target } = event;
    const bool = target.classList.contains('danger-text') ? false : true;
    const data = { isFlagged: bool, userId }
    modifyData(`${apiKey}/feed/${id}/flag`, data, token )
      .then(() => {
        fetchFlagStats()
      }).catch(err => {
          console.log(err)
      })
  }

  const handleDelete = (event) => {
    event.preventDefault();
    const endpoint = type === 'article' ? (
      `articles/${id}`
    ) : `gifs/${id}/${content[1]}`;
    trackPromise(
      deleteData(`${apiKey}/${endpoint}`, userId, token)
      .then(() => {
        const filterFeed = allFeed.filter(feed => feed.id !== id);
        updateFeed(filterFeed)
      }).catch(err => console.log(err))
    )
  }

  return ( 
    <article className="story margin-bottom-md">
      {authorId === parseInt(userId, 10) ? (
        <div className="d-flex" style={{justifyContent: 'flex-end'}}>
          <div className="padding-bottom-sm trigger-more-action cursor-pointer position-relative">
            <i className="fas fa-ellipsis-h font-md font-weight-bold color-dark tooltip"></i>
            <div className="more-option padding-md border-r-10">
              <div className="d-flex align-items-end font-weight-bold margin-bottom-sm padding-sm padding-bottom-xsm"
                onClick={(event) => handleDelete(event)}>
                <i className="fas fa-trash font-sm margin-right-sm"></i>
                <span className="font-sm">Delete {type === 'article' ? 'article' : 'GIF'}</span>
              </div>
              {type === 'article' ?  (
                <div className="d-flex align-items-end font-weight-bold padding-sm padding-bottom-xsm"
                  onClick={openModal}>
                  <i className="fas fa-pen font-sm margin-right-sm"></i>
                  <span className="font-sm">Edit article</span>
                </div>
              ) : null
              }
            </div>
          </div>
        </div>
      ) : null}
      <div className="margin-bottom-sm">
        <div className="d-flex justify-content--s-between margin-bottom-sm">
          <div className="poster--details">
            <Link to={authorId === parseInt(userId, 10) ? '/user/profile' : `/user/${firstName}_${lastName}`}
              style={{color: '#000'}}>
              <div className="d-flex nowrap">
                <img className="avatar--sm icon" 
                src={photoDetails[0]}
                  alt="poster avatar" />
                <div className="d-flex column">
                  <span className="poster--username text-content font-weight-bold margin-bottom-xsm">{`${firstName} ${lastName}`}</span>
                  <div className="margin-bottom-sm">
                    <span className="d-block font-sm gray-color">{createdOn}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="flag-stats justify-self-end">
            <i className={`fas fa-flag margin-right-sm cursor-pointer ${checkIfUserFlagged(flagStats, userId) ? 'danger-text' : ''}`}
              onClick={(event) => flag(event)}></i>
            <span className="flag font-weight-bold font-sm padding-sm border-r-circle">{flagStats.length === 0 ? '' : flagStats.length}</span>
          </div>
        </div>
      </div>
      <div className="post-content margin-bottom-sm">
        {contentType(type, id, content, title)}
      </div>
      <div className="category">
        {category.map((el, index) => {
          return <span key={index} className="border-r-10 text-content italic font-sm bckgr-color2 color-white padding-sm margin-right-sm margin-bottom-sm">{el}</span>
        })}
      </div>
      <div className="comment--flag--section padding-top-sm">
        <div className="stats d-flex justify-content--s-between align-items--center margin-bottom-sm
          padding-bottom-sm">
          <div className="comment-stats font-weight-bold cursor-pointer">
            <i className="fas fa-comments margin-right-sm paint-text"></i>
            <span className="value comment font-sm icon">{comments.length}</span> 
          </div>
          <div className="action padding-sm" id="add--comment"
            style={{border: '1px solid #a0a0a0', borderRadius: '10px', justifySelf: 'flex-end'}}
            onClick={openModal_Comments}>
            <i className="fas fa-comment icon color2"></i>
            <span className="font-weight-bold">Comment</span>
          </div>
        </div>
      </div>
      {ModalChild}
      {ModalChild_Comments}
    </article>
  );
}

export default Content;
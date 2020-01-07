import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import { getData, modifyData, apiKey, deleteData } from '../../../GeneralComponents/AJAX/HttpRequest';
import { useFeedContext, checkIfUserFlagged } from '../../../GeneralComponents/HelperFunctions/feed';
import { useHttpStatus } from '../../../GeneralComponents/displayMessage/DisplayTop';
import CommentForm from './CommentForm.component';
import { useFormInput } from '../../../GeneralComponents/HelperFunctions/form';

const Comment = (props) => {
  const [component, setComponent] = useState('comment');
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus()
  const { feedId, feedType, users, userData: { userId, token }, comment: { id, comment, userid, createdon } } = props;
  const author = users.find(user => user.employeeId === userid);
  const { photoDetails, firstName, lastName, employeeId: authorId } = author;
  const { state: newComment, onChange: editComment, resetValue } = useFormInput(comment);
  const [flagStats, setFlagStats] = useState([]);
  const { deleteComment } = useFeedContext('delete');
  const { modifyComment } = useFeedContext('edit');

  const fetchFlagStats = useCallback(() => {
    const contentType = feedType === 'article' ? 'articles' : 'gifs';
    getData(`${apiKey}/${contentType}/${feedId}/comment/${parseInt(id, 10)}/flagStats`, userId, token )
    .then(res => {
      const { data: { flagStats } } = res;
      setFlagStats(flagStats)
      console.log(flagStats)
    }).catch(err => {
      console.log(err)
    })
  }, [feedId, feedType, id, token, userId]);
  
  useEffect(() => {
    fetchFlagStats()
  }, [fetchFlagStats])

  const flag = (event) => {
    event.preventDefault();
    const { target } = event;
    const bool = target.classList.contains('danger-text') ? false : true;
    const data = { isFlagged: bool, userId }
    modifyData(`${apiKey}/${feedType}s/${feedId}/comment/${parseInt(id, 10)}/flag`, data, token )
      .then((res) => {
        fetchFlagStats()
      }).catch(err => {
        console.log(err)
      })
  }

  const handleDelete = (event) => {
    event.preventDefault();
    console.log(id);
    trackPromise(
      deleteData(`${apiKey}/${feedType}s/${feedId}/comment/${parseInt(id, 10)}`, userId, token)
      .then((res) => {
        const { status, message } = res;
        updateAjaxStatus({show: true, message, status});
        deleteComment(feedId, id);
      }).catch(err => {
        const { status, error } = err;
        updateAjaxStatus({show: true, message: error.split(',')[0], status});
      })
    )
  }

  const handleEdit = (event) => {
    event.preventDefault();
    console.log(id);
    const data = { userId, comment: newComment };
    console.log(data);
    trackPromise(
      modifyData(`${apiKey}/${feedType}s/${feedId}/comment/${parseInt(id, 10)}`, data, token)
      .then((res) => {
        const { status, data: { message, commentDetails } } = res;
        console.log(commentDetails);
        modifyComment(feedId, id, commentDetails);
        resetValue();
        setComponent('comment');
        updateAjaxStatus({show: true, message, status});
      }).catch(err => {
        console.log(err);
        const { status, error } = err;
        updateAjaxStatus({show: true, message: error.split(',')[0], status});
      })
    )
  };
  return ( 
    <Fragment>
      {
        component === 'comment' ? (
          <article className="margin-bottom-sm border-line--h">
              {authorId === parseInt(userId, 10) ? (
              <div className="d-flex" style={{justifyContent: 'flex-end'}}>
                <div className="padding-bottom-sm trigger-more-action cursor-pointer position-relative">
                  <i className="fas fa-ellipsis-h font-md font-weight-bold color-dark tooltip"></i>
                  <div className="more-option sm padding-md border-r-10">
                    <div className="d-flex align-items-end font-weight-bold margin-bottom-sm padding-sm padding-bottom-xsm"
                      onClick={(event) => handleDelete(event)}>
                      <i className="fas fa-trash font-sm margin-right-sm"></i>
                      <span className="font-sm">Delete</span>
                    </div>
                    <div className="d-flex align-items-end font-weight-bold padding-sm padding-bottom-xsm"
                      onClick={() => setComponent('commentForm')}>
                      <i className="fas fa-pen font-sm margin-right-sm"></i>
                      <span className="font-sm">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="margin-bottom-sm">
              <div className="d-flex justify-content--s-between align-items--center margin-bottom-sm">
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
                          <span className="d-block font-sm gray-color">{createdon}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flag-stats ">
                  <i className={`fas fa-flag margin-right-sm cursor-pointer ${checkIfUserFlagged(flagStats, userId) ? 'danger-text' : ''}`}
                    onClick={(event) => flag(event)}></i>
                  <span className="flag font-weight-bold font-sm padding-sm border-r-circle">{flagStats.length === 0 ? '' : flagStats.length}</span>
                </div>
              </div>
            </div>
            <div className="comment-content margin-bottom-sm">
              <div className="text-content padding-bottom-sm">
                <p>{comment}</p>
              </div>
            </div>
          </article>
        ) : (
          <div className="d-flex column">
            <CommentForm value={newComment} handleInput={editComment} button={false} />
            <div className="d-flex align-self-end margin-top-sm">
              <button className="border-r-5 padding-sm cursor-pointer font-sm margin-right-sm"
              onClick={() => setComponent('comment')}>Cancel</button>
              <button className="border-r-5 padding-sm cursor-pointer font-sm bckgr-color2 color-white"
              onClick={(event) => handleEdit(event)}>Update</button>
            </div>
          </div>
        )
      }
      {HttpStatusComponent}
    </Fragment>
  );
}

export default Comment;
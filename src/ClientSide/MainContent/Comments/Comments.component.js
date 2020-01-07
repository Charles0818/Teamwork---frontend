import React, { useContext } from 'react';
import Comment from './Comment.component';
import { UserContext } from '../../../GeneralComponents/context/userContext';
import { sendData, apiKey} from '../../../GeneralComponents/AJAX/HttpRequest';
import { useFeedContext } from '../../../GeneralComponents/HelperFunctions/feed';
import { useHttpStatus } from '../../../GeneralComponents/displayMessage/DisplayTop';
import { useFormInput } from '../../../GeneralComponents/HelperFunctions/form';
import CommentForm from './CommentForm.component';

const Comments = (props) => {
  const { feedId, feedType, comments, users } = props;
  const { state: comment, onChange: setComment, resetValue } = useFormInput();
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus();
  const { data: { userId, token } } = useContext(UserContext);
  const { addComment } = useFeedContext('add');

  const handleSubmit =(event) => {
    event.preventDefault();
    const contentType = feedType === 'article' ? 'articles' : 'gifs';
    const reqBody = { comment, userId: parseInt(userId, 10) }
    sendData(`${apiKey}/${contentType}/${feedId}/comment`, reqBody, token)
    .then(res => {
      const { status, data: { commentDetails, message } } = res;
      addComment(feedId, commentDetails);
      resetValue();
      updateAjaxStatus({show: true, message, status})
    }).catch(err => {
      const { error, status } = err;
      console.log(err);
      updateAjaxStatus({show: true, message: error.split(',')[0], status});
    })
  }
  
  return (
    <div className="comment--section">
      {comments.map((comment, index) => <Comment key={index} comment={comment} feedId={feedId} feedType={feedType} users={users} userData={{userId, token}} />)}
      <CommentForm handleInput={setComment} value={comment} action={handleSubmit}/>
      {HttpStatusComponent}
    </div>
  );
}

export default Comments;
import React, { useContext, Fragment } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { apiKey, sendData } from '../../AJAX/HttpRequest';
import { FeedContext } from '../../context/feedContext';
import { useHttpStatus } from '../../displayMessage/DisplayTop';
import { assignPropsToNewFeed } from '../../HelperFunctions/feed';
import { useFormInput } from '../../HelperFunctions/form';
import formValidation from '../formValidation';
import '../form.css';

const CreateArticle = (props) => {
  const { userData: { userId, token }, closeModal  } = props;
  const { feed, updateFeed } = useContext(FeedContext);
  const { state: title, onChange: changeTitle } = useFormInput();
  const { state: article, onChange: changeArticle, resetValue } = useFormInput();
  const { state: category, onChange: setCategory } = useFormInput();
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus();
  const formIsValid = true;

  const splitCategory = (category) => {
    category = category.split(',' || ';');
    return category.length === 0 ? null : category
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      title,
      article,
      userId: parseInt(userId, 10),
      category: splitCategory(category)
    }
    trackPromise(
      sendData(`${apiKey}/articles`, data, token)
      .then(res => {
        console.log(res.data);
        const { status, data, data: { message } } = res;
        console.log(data);
        updateFeed([assignPropsToNewFeed(data.feed), ...feed]);
        updateAjaxStatus({show: true, message, status});
        resetValue();
        closeModal();
      }).catch(err => {
        const { error, status } = err;
        updateAjaxStatus({show: true, message: error.split(',')[0], status});
      })
    )
  }

  return (
    <Fragment>
      <form style={{width: '400px'}} className="form" method="POST">
        <label> Title
          <input type="text" name="title" placeholder="Enter title" 
            className="form-control" value ={title}
            onChange = {(event) => changeTitle(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <label> Category
          <input type="text" name="category" placeholder="(Optional) separate every category with ','" 
            className="form-control" value ={category}
            onChange = {(event) => setCategory(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <label>Content
          <textarea type="text" name="articleBody" placeholder="What's happening?" 
          className="form-control textarea" value ={article}
          onChange = {(event) => changeArticle(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <button disabled={!formIsValid} className={`submit--btn ${formIsValid ? '' : 'isInvalid'}`}
          onClick={(event) => handleSubmit(event)}>Publish</button>
      </form>
      {HttpStatusComponent}
    </Fragment>
  );
}

export default CreateArticle;
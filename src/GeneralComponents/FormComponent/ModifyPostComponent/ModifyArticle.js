import React, { useContext, useState, Fragment } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { apiKey, modifyData } from '../../AJAX/HttpRequest';
import { FeedContext } from '../../context/feedContext';
import { useFormInput } from '../../HelperFunctions/form';
import { useHttpStatus } from '../../displayMessage/DisplayTop';
import '../form.css';
// import formValidation from '../formValidation';

const ModifyArticle = (props) => {
  const { articleId, userData: { userId, token }, closeModal } = props;
  const { feed, updateFeed } = useContext(FeedContext);
  const { category, setCategory } = useState(props.category);
  const [ formIsValid, setFormIsValid ] = useState(true);
  const { state: title, onChange: changeTitle } = useFormInput(props.title);
  const { state: article, onChange: changeArticle } = useFormInput(props.article);
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus()

  const splitCategory = (event) => {
    const { target: { value } } = event;
    setCategory(value.split(''))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      title,
      article,
      userId: parseInt(userId, 10),
      category: category.length === 0 ? null : category
    }
    trackPromise(
      modifyData(`${apiKey}/articles/${articleId}`, data, token, false)
      .then(res => {
        console.log(res.data);
        const { status, data: { message, title, article, category} } = res;
        const updateContext  = feed.map(el => {
          if (el.id === articleId) {
            el.title = title;
            el.category = category;
            el.content = article;
          }
          return el
        });
        updateFeed(updateContext);
        updateAjaxStatus({show: true, message, status});
        closeModal();
      }).catch(err => {
        const { status, error } = err;
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
            onChange = {(event) => splitCategory(event)}
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
          onClick={(event) => handleSubmit(event)}>Update</button>
      </form>
      {HttpStatusComponent}
    </Fragment>
  );
}

export default ModifyArticle;
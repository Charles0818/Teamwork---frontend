import React, { useContext, Fragment } from 'react';
import { apiKey, sendData } from '../../AJAX/HttpRequest';
import { FeedContext } from '../../context/feedContext';
import { trackPromise } from 'react-promise-tracker';
import { useHttpStatus } from '../../displayMessage/DisplayTop';
import { assignPropsToNewFeed } from '../../HelperFunctions/feed';
import { useFormInput } from '../../HelperFunctions/form';
import '../form.css';

const CreateGif = (props) => {
  const { userData: { token, userId } } = props;
  const { feed, updateFeed } = useContext(FeedContext);
  const { state : title, onChange: changeTitle } = useFormInput();
  const { state: category, onChange: setCategory } = useFormInput(); 
  const { state: file, handleFile: changeFile } = useFormInput(); 
  const { state: fileURL, handleFile: changeFileURL } = useFormInput();
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus(); 

  const onFileChange = (event) => {
    event.preventDefault();
    const { target: { files } } = event;
    changeFileURL(URL.createObjectURL(files[0]));
    changeFile(files[0]);
  }

  const splitCategory = (category) => {
    category = category.split(',' || ';');
    return category.length === 0 ? null : category
  };

  const handleSubmit = (event) => {
    const formData = new FormData();
    formData.append('files', file);
    formData.append('title', title);
    formData.append('category[]', splitCategory(category))
    formData.append('userId', userId);
    console.log(formData)
    event.target.value = 'Publishing...'
    trackPromise(
      sendData(`${apiKey}/gifs`, formData, token, true)
      .then(res => {
        const { status, data, data: { message } } = res;
        updateFeed([assignPropsToNewFeed(data.feed), ...feed]);
        updateAjaxStatus({show: true, message, status});
        console.log(res);
      }).catch(err => {
        const { status, error } = err;
        updateAjaxStatus({show: true, message: error.split(',')[0], status});
        console.log(err)
      })
    )
  }

  return (
    <Fragment>
      <form className="form" method="POST">
        <label> GIF title
          <input type="text" name="title" placeholder="Enter title" 
            className="form-control" value ={title}
            onChange = {(event) => changeTitle(event)}
          />
          <span className="error-msg italic padding-sm"></span>
        </label>
        <label> Category
          <input type="text" name="category" placeholder="(Optional) separate every category with ','" 
            className="form-control" value ={category}
            onChange = {(event) => setCategory(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <div className="file_display padding-bottom-sm"
          style={{width: '150px', height: 'auto', display: `${fileURL === null ? 'none' : 'inline-block'}`}}>
          <img src={fileURL} alt="" style={{width: '100%', height:'auto'}} />
        </div>
        <div className="padding-bottom-md">
          <label className="btn--file d-inline-block">
            <div className="upload--icon">
              <i className="far fa-image font-md d-inline-block"></i>
              <span className="padding-left-sm font-sm">{'Upload GIF...'}</span>
            </div>
            <input type="file" name="file" multiple={false} onChange = {(event) => onFileChange(event)} />
          </label>
          <span className="error-msg italic padding-sm"></span>
        </div>
        <input onClick={(event) => handleSubmit(event)} type="submit" value="Publish" className="submit--btn" />
      </form>
      {HttpStatusComponent}
    </Fragment>
  );
}
 
export default CreateGif;
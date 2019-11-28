import React, { Component } from 'react';
import { apiKey, sendData } from '../../AJAX/HttpRequest';
import { FeedContext } from '../../context/feedContext';
import { trackPromise } from 'react-promise-tracker';
import '../form.css'

class CreateGif extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: '',
            category: '',
            file: null,
            fileURL: null
         }
    }
    static contextType  = FeedContext;

    handleUserInput = (event) => {
      event.preventDefault();
      const { type } = event.target.attributes;
      // const name = event.target.name;
      const { name, value } = event.target;
      if(type === 'file') {
        this.setState({
          fileURL: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0]
        });
        return
      }
      this.setState({[name]: value}, () => {
      console.log(this.state);
      })
    }

    assignArray = (category) => {
      category = category.split(',');
      return category.length <= 0 ? null : category
    }
    handleSubmit = (event) => {
      event.preventDefault();
      let { feed, updateFeed } = this.context;
      const { token, userId } = this.props.userData;
      let { title, category, file } = this.state;
      category = this.assignArray(category);
      const formData = new FormData();
      formData.append('files', file);
      formData.append('title', title);
      formData.append('category', category)
      formData.append('userId', userId)
      event.target.value = 'Publishing...'
      trackPromise(
        sendData(`${apiKey}/gifs`, formData, token)
        .then(res => {
          event.target.value = 'Publish'
          const { data } = res;
          feed = [data, ...feed];
          updateFeed(feed)
          console.log(res);
        }).catch(err => {
          console.log(err)
        })
      )
    }


    render() { 
        return ( 
          <form className="form" method="POST" ref="createGif">
            <label> GIF title
              <input type="text" name="title" placeholder="Enter title" 
                  className="form-control" value ={this.state.title}
                  onChange = {(event) => this.handleUserInput(event)}
              />
              <span className="error-msg italic padding-sm"></span>
            </label>
            <label> Category
              <input type="text" name="category" placeholder="(Optional) separate every category with ','" 
                  className="form-control" value ={this.state.category}
                  onChange = {(event) => this.handleUserInput(event)}
              />
            </label>
            <span className="error-msg italic padding-sm"></span>
            <div className="file_display"
              style={{width: '150px', height: '150px', display: `${this.state.fileURL === null ? 'none' : 'inline-block'}`}}>
              <img src={this.state.fileURL} alt="" />
            </div>
            <div className="padding-bottom-md">
              <label className="btn--file d-inline-block">
                <div className="upload--icon">
                  <i className="far fa-image font-md d-inline-block"></i>
                  <span className="padding-left-sm font-sm">{'Upload GIF...'}</span>
                </div>
                <input type="file" name="file" multiple={false} onChange = {(event) => this.handleUserInput(event)} />
              </label>
              <span className="error-msg italic padding-sm"></span>
            </div>
            <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Publish" className="submit--btn" />
          </form>
        );
    }
}
 
export default CreateGif;
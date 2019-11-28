import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { apiKey, sendData } from '../../AJAX/HttpRequest';
import { FeedContext } from '../../context/feedContext';


import '../form.css';
import formValidation from '../formValidation';
class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      articleBody: '',
      category: '',
      // InputIsValid:
      formIsValid: true,
      error: {
        title: 'title should not be empty',
        articleBody: 'Content should not be empty',
        category: []
      }
     }
  }

  static contextType = FeedContext;

  handleUserInput = (event) => {
    event.preventDefault();
    const { target } = event;
    console.log(target);
    const { name, value } = target;
    if (name === 'category') {
      const category = value.split(',');
      this.setState({[name]: category});
      return
    }
    this.setState({[name]: value}
      // , () => {
      // formValidation(target, name, value)
    )
    console.log(this.state)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { feed, updateFeed } = this.context;
    const { userId, token } = this.props.userData
    const { title, articleBody, category } = this.state;
    const data = {
      title,
      article: articleBody,
      userId: parseInt(userId, 10),
      category: category.length === 0 ? null : category
    }
    console.log(data);
    trackPromise(
      sendData(`${apiKey}/articles`, data, token)
      .then(res => {
        console.log(res.data);
        const { status, data } = res;
        updateFeed(data, ...feed)
      }).catch(err => {
        const { error } = err;
        console.log(err);
      })
    )
  }

  render() {
    const { formIsValid } = this.state;
    return ( 
      <form style={{width: '400px'}} className="form" method="POST" ref="createGif">
        <label> Title
          <input type="text" name="title" placeholder="Enter title" 
              className="form-control" value ={this.state.title}
              onChange = {(event) => this.handleUserInput(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <label> Category
          <input type="text" name="category" placeholder="(Optional) separate every category with ','" 
              className="form-control" value ={this.state.category}
              onChange = {(event) => this.handleUserInput(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <label>Content
          <textarea type="text" name="articleBody" placeholder="What's happening?" 
            className="form-control textarea" value ={this.state.articleBody}
            onChange = {(event) => this.handleUserInput(event)}
          />
        </label>
        <span className="error-msg italic padding-sm"></span>
        <button disabled={!formIsValid} className={`submit--btn ${formIsValid ? '' : 'isInvalid'}`}
          onClick={(event) => this.handleSubmit(event)}>Publish</button>
      </form>
    );
  }
}

export default CreateArticle;
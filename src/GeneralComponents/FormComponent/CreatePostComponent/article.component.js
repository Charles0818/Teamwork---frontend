import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { apiKey, sendData } from '../../AJAX/HttpRequest';

import '../form.css';
import formValidation from '../formValidation';
class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: '',
      articleBody: '',
      // InputIsValid:
      formIsValid: true,
      error: ''
     }
  }

  handleUserInput = (event) => {
    event.preventDefault();
    const { target } = event;
    console.log(target);
    const { name, value } = target
    this.setState({[name]: value}, () => {
      formValidation(target, value)
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, articleBody } = this.state;
    const data = {
      title,
      article: articleBody
    }
    trackPromise(
      sendData(`${apiKey}/articles`, data)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        const { error } = err;
        this.setState(
          {error: (error === "Incorrect Password" || "User not found") ? 'Email or password is incorrect' : ''}
        )
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
          <span className="error-msg italic padding-sm"></span>
        </label>
        <label>
          <textarea type="text" name="articleBody" placeholder="What's happening?" 
            className="form-control textarea" value ={this.state.articleBody}
            onChange = {(event) => this.handleUserInput(event)}
          />
          <span className="error-msg italic padding-sm"></span>
        </label>
        <button disabled={!formIsValid} className={`submit--btn ${formIsValid ? '' : 'isInvalid'}`}>Publish</button>
      </form>
    );
  }
}

export default CreateArticle;
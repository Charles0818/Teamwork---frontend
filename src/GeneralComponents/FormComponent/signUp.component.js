import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { apiKey, sendData } from '../AJAX/HttpRequest';
import { UserContext } from '../context/userContext';
import './form.css';

class CreateUser extends Component {
  constructor(props) {
      super(props);
      this.state = { 
       }
  }

  static contextType = UserContext;

  handleUserInput = (event) => {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { data: { token, userId } } = this.context
    const data = {...this.state, userId: parseInt(userId, 10)};
    console.log(data);
    trackPromise(
      sendData(`${apiKey}/auth/create-user`, data, token)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    )
  }
  
  render() {
    console.log(this.state)
    return ( 
      <form className="form" method="POST">
        <label> First Name
          <input onChange={(event) => this.handleUserInput(event)} type="text" name="firstName" placeholder="Enter Firstname" className="form-control" />
        </label>
        <label> Last Name
          <input onChange={(event) => this.handleUserInput(event)} type="text" name="lastName" placeholder="Enter Lastname" className="form-control" />
        </label>
        <label> Email
          <input onChange={(event) => this.handleUserInput(event)} type="email" name="email" 
              placeholder="Enter employee's email" className="form-control" 
          />
        </label>
        <label> Password
          <input onChange={(event) => this.handleUserInput(event)} type="password" name="password" 
              placeholder="Create employee's password" className="form-control" 
          />
        </label>
        <div className="padding-bottom-sm padding-top-sm">
          <h4 className="heading md padding-bottom-sm">Gender</h4>
          <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md padding-bottom-xsm "> <span>male</span>
            <input onChange={(event) => this.handleUserInput(event)} type="radio" value="male" name="gender" className="form-control" id="web_dev" />
            <span className="checkmark border-r-circle"></span>
          </label>
          <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md ">female
            <input onChange={(event) => this.handleUserInput(event)} type="radio" value="female" name="gender" className="form-control" id="female" />
            <span className="checkmark border-r-circle"></span>
          </label>
        </div>
        <label> Job Role
          <input onChange={(event) => this.handleUserInput(event)} type="text" name="jobRole" placeholder="Job Role (e.x Frontend Web Developer)" className="form-control" />
        </label>
        <label> Department
          <input onChange={(event) => this.handleUserInput(event)} type="text" name="department" placeholder="Employee's department" className="form-control" />
        </label>
        <label> Address
          <input onChange={(event) => this.handleUserInput(event)} type="text" name="address" placeholder="Enter Address" className="form-control" />
        </label>
        <div className="padding-bottom-sm padding-top-sm">
          <h4 className="heading md padding-bottom-xsm">Account type</h4>
          <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md padding-bottom-xsm">
            <span>Admin</span>
            <input onChange={(event) => this.handleUserInput(event)} type="radio" value="admin" name="accountType" className="form-control" />
            <span className="checkmark border-r-circle"></span>
          </label>
          <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md">Regular
            <input onChange={(event) => this.handleUserInput(event)} type="radio" value="regular" name="accountType" className="form-control" />
            <span className="checkmark border-r-circle"></span>
          </label>
        </div>
        <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Create User" className="submit--btn" />
      </form>
    );
  }
}

export default CreateUser;
import React, { Component, createContext } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { withRouter } from 'react-router-dom';
import { apiKey, sendData } from '../AJAX/HttpRequest';
import './form.css';

let UserContext = createContext();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '',
      password: '',
      error: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    const data = {
      email: email,
      password: password
    }
    trackPromise(
      sendData(`https://teamworkbycharles.herokuapp.com/api/v1/auth/signin`, data)
      .then(res => {
        const data = {
          isLoggedIn: true,
          userId: res.data.userId,
          account_type: res.data.account_type,
          token: res.data.token
        }
        UserContext = createContext(data);
        // store.set('loggedIn', true);
        (res.data.account_type === "admin") ? history.push('/admin/dashboard') : (
          history.push('/user/dashboard')
        )
        console.log(res.data);
        console.log(UserContext)
      }).catch(err => {
        const { error } = err;
        this.setState(
          {error: (error === "Incorrect Password" || "User not found") ? 'Email or password is incorrect' : ''}
        )
      })
    )
  }

  onChange = (event) => {
      event.preventDefault();
      const target = event.target;
      this.setState({
        [target.name]: target.value
      })
  }
  render() {
      console.log(this.state);
      return (
          <form className="form" method="POST" ref="LoginForm">
            <label> Email
                <input type="email" name="email" placeholder="Enter your email" 
                    className="form-control" value ={this.state.email} onChange = {(event) => this.onChange(event)}
                />
            </label>
            <label> Password
                <input type="password" name="password" placeholder="Enter Password"
                    className="form-control" value ={this.state.password} onChange = {(event) => this.onChange(event)}
                />
            </label>
              <span className="d-block italic danger-text font-sm padding-bottom-sm font-weight-bold">
                  {this.state.error}
              </span>
            <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Login" className="submit--btn" />
        </form>
      );
  }
}

// const UserProvider = UserContext.Provider;
// const UserConsumer = UserContext.Consumer;

export default withRouter(Login);
export { UserContext };

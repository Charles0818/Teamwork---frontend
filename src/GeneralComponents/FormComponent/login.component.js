import React, { useContext, useState, Fragment  } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { withRouter } from 'react-router-dom';
import { apiKey, sendData } from '../AJAX/HttpRequest';
import { UserContext } from '../context/userContext';
import { useFormInput } from '../HelperFunctions/form';
import { useHttpStatus } from '../displayMessage/DisplayTop';
import './form.css';

const Login = (props) =>  {
  const { history, closeModal } = props;
  const { state: email, onChange: changeEmail } = useFormInput();
  const { state: password, onChange: changePassword } = useFormInput();
  const { updateAjaxStatus, HttpStatusComponent } = useHttpStatus();
  const { updateAccount } = useContext(UserContext);
  const [ error, setError ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { email, password }
    trackPromise(
      sendData(`${apiKey}/auth/signin`, data)
      .then(res => {
        const { data } = res;
        const userData = { isLoggedIn: true, data };
        localStorage.setItem('jwtToken', data.token);
        console.log(data);
        updateAccount(userData);
        closeModal();
        (data.accountType === "admin") ? history.push('/admin') : (
          history.push('/user')
        )
      }).catch(err => {
        const { status } = err;
       if(status) {
        setError('Incorrect email or password');
        return
       }
       const message = 'Unable to connect to database, check your internet connection';
       updateAjaxStatus({show: true, message, status: 'failure'})
      })
    )
  }

  return (
    <Fragment>
      <form className="form" method="POST">
        <label> Email
          <input type="email" name="email" placeholder="Enter your email" 
            className="form-control" value ={email} onChange = {(event) => changeEmail(event)}
          />
        </label>
        <label> Password
          <input type="password" name="password" placeholder="Enter Password"
            className="form-control" value ={password} onChange = {(event) => changePassword(event)}
          />
        </label>
        <span className="d-block italic danger-text font-sm padding-bottom-sm font-weight-bold">
          {error}
        </span>
        <input onClick={(event) => handleSubmit(event)} type="submit" value="Sign in" className="submit--btn" />
      </form>
      {HttpStatusComponent}
    </Fragment>
  );
}

export default withRouter(Login);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext }  from 'react';
import { trackPromise } from 'react-promise-tracker';
import { Link, withRouter } from 'react-router-dom';
import {GetToken} from '../GeneralComponents/context/auth.component';

//components
import Login from '../GeneralComponents/FormComponent/login.component';
import './landingPage.styles.css';
import useModal from '../GeneralComponents/modalComponent/toggleModal';
import { getData, apiKey } from '../GeneralComponents/AJAX/HttpRequest';
import { UserContext, useAccount } from '../GeneralComponents/context/userContext';
import { addDefaultAvatar } from '../GeneralComponents/context/addDefaultAvatar';

const RedirectUser = (props) => {
  const { state, userId, token, push, openModal, setIsLoading, updateAccount, logout } = props;
  switch(state) {
    case 'expired':
      logout()
      setIsLoading(false)
      openModal()
      break;
    case 'not found':
      setIsLoading(false)
      openModal()
      break;
    case 'isValid':
      setIsLoading(true)
      trackPromise(
        getData(`${apiKey}/auth/users/user`, userId, token)
        .then(res => {
          let { data } = res;
          data.token = token;
          data = addDefaultAvatar(data)
          const userData = { isLoggedIn: true, data };
          console.log(data);
          updateAccount(userData);
          (data.accountType === "admin") ? push('/admin') : (
            push('/user')
          )
        }).catch(err => {
          const { status, error } = err;
          console.log(error);
        })
      )
      break;
    default:
      break;
  }
}

const LandingPage = (props) => {
  const { history: { push } }  = props;
  const [isLoading, setIsLoading] = useState(false);
  const { updateAccount } = useContext(UserContext);
  const { logout } = useAccount();

 const { openModal, ModalChild } = useModal('Sign in', Login);
 useEffect(() => {
  const { state, userId, token } = GetToken();
  console.log(state);
  RedirectUser({state, userId, token, push, openModal, setIsLoading, updateAccount, logout})

 }, [setIsLoading])

 if (isLoading) return null
  return (
    <header className="landingPage-header page-padding">
      <nav className="padding-top-sm d-flex align-items--center justify-content--s-between">
        <Link to="/">
          <div className="favicon color-white">
            <span className="italic font-lg">T</span>
            <span className="font-sm">eam</span>
            <span className="italic font-lg">W</span>
            <span className="font-sm">ork</span>
          </div>
        </Link>
        <div className="d-inline-block btn" onClick ={openModal}>Sign in</div>
      </nav>
      <div className="d-flex align-items--center justify-content--s-between margin-top-lg">
        <div className="desc color-white">
          <div className="padding-bottom-md">
            <h1 className="font-xlg padding-bottom-md">Build a stronger team spirit with your co-workers.</h1>
            <p className="font-md text-content">
              Teamwork is an internal social network specifically designed for companies to aid the
              communication strength among employees and the administrator.
            </p>
          </div>
          <div className="d-inline-block btn" onClick ={openModal}>Sign in</div>
        </div>
        <div className="desc d-flex align-items--center">
          <img src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/avatar-2191932_1280-removebg-preview_wqs7ev.png"
          alt="" style={{width: '100%', height: 'auto'}}/>
          <div className="bckgr-white border-r-10 padding-md" style={{width: '100%', height: 'auto'}}>
            <p className="font-md text-content color2 font-weight-600" style={{fontStyle: 'italic'}}>Learn, share ideas...
            Collaborate with your team and build a stronger connectivity that will surely reveal the hidden success. Teamwork!!!
            </p>
          </div>
        </div>
      </div>
      {ModalChild}
    </header>
  );
}

export default withRouter(LandingPage);
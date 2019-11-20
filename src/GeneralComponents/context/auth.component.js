/* eslint-disable no-unused-vars */
import React, { Context, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../context/userContext';


const UseAuth = () => {
    return (
      <UserContext.Consumer>
        {
          ({ isLoggedIn, token, account_type, userId }) => {
            console.log(isLoggedIn)
            return ({isLoggedIn, token, userId, account_type})
          }
        }
      </UserContext.Consumer>
      
    )
}

const isAuth = () => {
  const { userId, token, isLoggedIn } = UseAuth();
  return (userId && token && isLoggedIn) ? true : false
}

const isAdmin = () => {
  const { account_type } = UseAuth()
  return (account_type === 'admin' ) ? true : false
}

export { UseAuth, isAdmin, isAuth }

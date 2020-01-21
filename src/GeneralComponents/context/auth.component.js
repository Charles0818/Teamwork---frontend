/* eslint-disable no-unused-vars */
import jwt_decode from 'jwt-decode'
import { useContext } from 'react';
import { UserContext } from '../context/userContext';


const UseAuth = () => {
 const {isLoggedIn, data} = useContext(UserContext);
 const { userId, token, accountType } = data;

 return { isLoggedIn, userId, token, accountType }
 
}
const IsAuth = () => {
  const {isLoggedIn, userId, token } = UseAuth();
  return (
    isLoggedIn && userId && token ? true : false
  )
  
}

const IsAdmin = () => {
  const { accountType, isLoggedIn, userId, token } = UseAuth()
  return (isLoggedIn && userId && token && accountType === 'admin' ) ? true : false
}

export { IsAuth, IsAdmin }

export const GetToken = () => {
    let state = '';
    if(!localStorage.jwtToken) {
      state = 'not found';
      return { state }
    }
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    const { userId, exp } = decoded
    console.log(decoded);
    state = validateToken(exp)
    return { state, token, userId }
}

export const validateToken = (exp) => {
  const currentTime = Date.now() / 1000;
  let state = '';
  exp < currentTime ? state = 'expired' : state = 'isValid';
  return state
}
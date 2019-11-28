/* eslint-disable no-unused-vars */
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

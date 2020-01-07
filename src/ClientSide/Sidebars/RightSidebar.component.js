import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../GeneralComponents/context/usersContext';
import { slideRightSidebar } from '../../GeneralComponents/HelperFunctions/sidebar';
import './sidebar.style.css';

const RightSidebar = (props) => {
  const { userId } = props;
  let { users } = useContext(UsersContext);
  users = users.map((user) => {
    const { photoDetails, firstName, lastName, employeeId } = user;
    return { photoDetails, firstName, lastName, employeeId }
  });
  
  return ( 
    <aside className="aside right bckgr-white padding-top-md">
      <div className="position-relative">
        <i className="fas fa-times close font-sm cursor-pointer"
          onClick={(event) => slideRightSidebar(event)}>
        </i>
        <div className="accordion">
          <div className="accordion--btn d-flex justify-content--center">
            <span className="font-md font-weight-600">All Colleagues</span>
          </div>
          <div className="content-wrapper">
            <ul className="online--users">
              {users.map((user, index) => {
                const { photoDetails, firstName, lastName, employeeId } = user
                return (
                  <Link to={`${userId === employeeId ? '/user/profile' : `/user/${firstName}_${lastName}`}`} key={index}>
                    <li className="user d-flex align-items--center margin-bottom-md nowrap action" key={index}>
                      <div className="position-relative">
                        <img className="avatar--sm icon" src={photoDetails[0]} alt="poster avatar" />
                        <span className="online"></span>
                      </div>
                      <span className="font-sm username">{`${firstName} ${lastName} ${userId === employeeId ? '(You)' : ''}`}</span>
                    </li>
                  </Link>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
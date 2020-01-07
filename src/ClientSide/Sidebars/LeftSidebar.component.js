import React from 'react';
import { Link } from 'react-router-dom';
import { slideLeftSidebar } from '../../GeneralComponents/HelperFunctions/sidebar';
import './sidebar.style.css';
const LeftSidebar = (props) => {
  const { updateAccount, userData, userData: { photoDetails, interests, accountType } } = props;
  const handleLogout = () => {
    const data = { isLoggedIn: false, userData }
    updateAccount(data);
  }
  return ( 
    <aside className="aside left padding-top-sm">
      <div className="position-relative">
        <i className="fas fa-times close color-white font-sm cursor-pointer"
          onClick={(event) => slideLeftSidebar(event)}>
        </i>
      </div>
      <div className="padding-top-md">
        <div className="about-user border-line--h d-flex justify-content--center column align-items--center padding-bottom-sm">
          <Link to='/user/profile' className="user_avatar avatar--lg">
            <img src={photoDetails[0]} alt="user avatar" />
          </Link>
          <div className="interests margin-top-md d-flex padding-md">
            { interests !== null ? (
              interests.map((interest, index) => {
                return <span key={index} className="margin-right-sm margin-bottom-sm btn font-sm padding-sm">{interest}</span>
              })
            ) : null}
          </div>
        </div>
        <div className="content-wrapper">
          <ul className="margin-bottom-md">
            {accountType === "admin" ? (
              <Link to="/admin/dashboard">
                <li className="sidebar-link padding-bottom-md margin-bottom-sm cursor-pointer">
                  <i className="fas fa-cogs color-white padding-right-sm font-sm"></i>
                  <span className="sidebar--link-text font-sm">Admin Panel</span>
                </li>
            </Link>
            ) : null}
            <li className="sidebar-link padding-bottom-md margin-bottom-sm cursor-pointer">
              <i className="fas fa-newspaper color-white padding-right-sm font-md"></i>
              <span className="sidebar--link-text font-md">Dashboard</span>
            </li>
            <li className="sidebar-link padding-bottom-md margin-bottom-sm cursor-pointer cursor-pointer" onClick={() => handleLogout()}>
              <i className="fas fa-sign-out-alt color-white padding-right-sm font-sm"></i>
              <span className="sidebar--link-text font-md">Log out</span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.style.css';
class LeftSidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }

  handleLogout = () => {
    const isLoggedIn = false;
    const { updateAccount, userData } = this.props;
    const data = {
      isLoggedIn,
      userData
    }
    updateAccount(data);

  }
  render() {
    const { userData: { photoDetails, interests, accountType } } = this.props;
    console.log(this.props.userAccount)
    return ( 
      <aside>
        <div className="aside left">
          <div className="padding-top-lg">
            <div className="about-user border-line--h d-flex justify-content--center column align-items--center padding-bottom-sm">
              <div className="user_avatar avatar--lg">
                <img src={photoDetails[0]} alt="user avatar" />
              </div>
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
                <li className="sidebar-link padding-bottom-md margin-bottom-sm cursor-pointer cursor-pointer" onClick={() => this.handleLogout()}>
                  <i className="fas fa-sign-out-alt color-white padding-right-sm font-sm"></i>
                  <span className="sidebar--link-text font-md">Log out</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }
}

export default LeftSidebar;
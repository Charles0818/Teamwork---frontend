import React, { Component } from 'react';
import './sidebar.style.css';
class LeftSidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }
  render() { 
    return ( 
      <aside>
        <div className="aside left">
          <div className="padding-top-lg">
            <div className="about-user border-line--h d-flex justify-content--center column align-items--center padding-bottom-sm">
              <div className="user_avatar">
                <img className="avatar--lg" src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="user avatar" />
              </div>
              <div className="interests margin-top-md d-flex padding-md">
                <span className=" margin-right-sm margin-bottom-sm btn font-sm padding-sm">Technology</span>
                <span className=" margin-right-sm margin-bottom-sm btn font-sm padding-sm">Robotic Innovation</span>
                <span className=" margin-right-sm margin-bottom-sm btn font-sm padding-sm">Web Socket</span>
                <span className=" margin-right-sm margin-bottom-sm btn font-sm padding-sm">Deep Learning</span>
              </div>
            </div>
            <div className="content-wrapper">
              <ul>
                <li className="sidebar-link">
                  <i className="fas fa-bell icon font-md"></i>
                  <span className="sidebar--link-text font-md">Dashboard</span>
                </li>
                <li className="sidebar-link">
                  <i className="fas fa-bell icon font-md"></i>
                  <span className="sidebar--link-text font-md">Dashboard</span>
                </li>
                <li className="sidebar-link">
                  <i className="fas fa-bell icon font-md"></i>
                  <span className="sidebar--link-text font-md">Dashboard</span>
                </li>
                <li className="sidebar-link">
                  <i className="fas fa-cogs icon font-md"></i>
                  <span className="sidebar--link-text font-md">Settings</span>
                </li>
                <li className="sidebar-link">
                  <i className="fas fa-laptop icon font-md"></i>
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
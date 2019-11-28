import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSidebar from '../Sidebars/RightSidebar.component';
import Article from '../MainContent/NewsFeed/Content.component';
import './profile.style.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    const { match, UserData: { firstName, lastName, photoDetails, department, jobRole, gender, interests, address }} = this.props;
    return (
      <div className="d-flex">
        <div className="profileDetails main margin-right-md">
          <div className="profileHeader bckgr-white padding-left-lg padding-right-lg padding-md position-relative">
            <Link to={`${match.url}/edit#profile-pictire_username`} className="" style={{position: 'absolute', top: '25px', right: '30px'}}>
              <i className="fas fa-pen font-lg color2 tooltip margin-bottom-sm cursor-pointer"></i>
              <div className="view tooltip-text color-white bckgr-color2">Update Profiele Pic / Username</div>
            </Link>
            <div className="padding-md d-flex justify-content--s-between align-items--center">
              <div className="avatar--lg cursor-pointer">
                <img src={photoDetails[0]} alt="user avatar" />
              </div>
              <div className="align-self-end">
                <div className="font-lg font-weight-bold" style={{lineHeight: '30px'}}>{`${firstName} ${lastName}`}</div>
                <span className="gray-color">@{jobRole}</span>
              </div>
            </div>
          </div>
          <div className="padding-md d-flex justify-content--s-between">
            <div className="">
              <div className="about-section bckgr-white margin-right-md padding-md padding-left-md">
                <ul className="user_info">
                  <li className="margin-bottom-md d-flex align-items-end">
                    <i className="far fa-building font-md color2 margin-right-sm"></i>
                    <span className="font-md font-weight-600"> {department}</span>
                  </li>
                  <li className="margin-bottom-md d-flex align-items-end">
                    <i className="fas fa-briefcase font-md color2 margin-right-sm"></i>
                    <span className="font-md font-weight-600"> {jobRole}</span>
                  </li>
                  <li className="margin-bottom-md d-flex align-items-end">
                    <i className={"fas fa-user, color2, font-md, padding-right-sm"}></i>
                    <span className="font-md font-weight-600"> {gender}</span>
                  </li>
                  <li className="margin-bottom-md d-flex align-items-end">
                    <i className="fas fa-location-arrow"></i>
                    <span className="font-md font-weight-600"> Benin City, Nigeria</span>
                  </li>
                  <li className="margin-bottom-md d-flex align-items-end">
                    <i className="fas font-md fa-map-marker-alt"></i>
                    <span className="font-md font-weight-600"> {address}</span>
                  </li>
                </ul>
                <Link to={`${match.url}/edit#about-info`} eventName="Edit About info"
                  className="bckgr-color2 d-inline-block padding-sm color-white cursor-pointer">
                  <i className="fas fa-pen font-sm margin-right-sm"></i>
                  Edit About Info
                </Link>
              </div>
              <div className="">
                
              </div>
            </div>
            <div className="user-posts bckgr-white">
              <Article />
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    )
  }
}
 
export default Profile;
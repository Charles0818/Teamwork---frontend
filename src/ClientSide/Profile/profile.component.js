import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import RightSidebar from '../Sidebars/RightSidebar.component';
import './profile.style.css';
import { UserContext } from '../../GeneralComponents/context/userContext';
import { getData, apiKey } from '../../GeneralComponents/AJAX/HttpRequest';
import { assignProperties, renderFeed } from '../../GeneralComponents/HelperFunctions/feed';
import Navbar from '../../GeneralComponents/Navbar/Navbar.component';

const Profile = (props) => {
  const [feed, updateFeed] = useState([]);
  const { match: { path, url }  } = props;
  const { data: { firstName, lastName, photoDetails, department, jobRole, gender, address, userId, token } } = useContext(UserContext);
  const userData = { userId, token };
  useEffect(() => {
    trackPromise(
      getData(`${apiKey}/feed/${userId}`, userId, token)
      .then(res => {
        const { data: { content, comments, flags } } = res;
        const feed = [...assignProperties(content, comments, flags)]
        updateFeed([...feed])
      }).catch(err => console.log(err))
    )
  }, [token, userId]);

  return (
    <Fragment>
      <Route path={path} component={Navbar} />
      <div className={`d-flex`}>
        <div className="profileDetails main margin-right-md">
          <div className="profileHeader bckgr-white padding-left-lg padding-right-lg padding-md margin-right-sm margin-left-sm position-relative">
            <Link to={`${url}/edit#profile-pictire_username`} className="position-relative" style={{position: 'absolute', top: '25px', right: '30px'}}>
              <i className="fas fa-pen font-lg color2 tooltip margin-bottom-sm cursor-pointer"></i>
              <div className="view tooltip-text color-white bckgr-color2">Update avatar / username</div>
            </Link>
            <div className="padding-md d-flex justify-content--s-between align-items--center">
              <div className="avatar--lg cursor-pointer margin-bottom-sm">
                <img src={photoDetails[0]} alt="user avatar" />
              </div>
              <div className="align-self-end">
                <div className="font-lg font-weight-bold" style={{lineHeight: '30px'}}>{`${firstName} ${lastName}`}</div>
                <span className="gray-color">@{jobRole}</span>
              </div>
            </div>
          </div>
          <div className={`padding-md d-flex justify-content--s-between details`}>
            <div className="about-section bckgr-white margin-bottom-sm padding-md padding-left-md">
              <ul className="user_info">
                <li className="margin-bottom-md d-flex align-items-end">
                  <i className="far fa-building font-md color2 margin-right-sm"></i>
                  <span className="font-sm font-weight-600 "> {department}</span>
                </li>
                <li className="margin-bottom-md d-flex align-items-end">
                  <i className="fas fa-briefcase font-md color2 margin-right-sm"></i>
                  <span className="font-sm font-weight-600 "> {jobRole}</span>
                </li>
                <li className="margin-bottom-md d-flex align-items-end">
                  <i className={"fas fa-user color2 font-md padding-right-sm"}></i>
                  <span className="font-sm font-weight-600 "> {gender}</span>
                </li>
                <li className="margin-bottom-md d-flex nowrap align-items-end">
                  <i className="fas fa-map-marker-alt color2 font-md padding-right-sm"></i>
                  <div className="d-flex column">
                    <span className="font-sm font-weight-600 text-content"> {address}</span>
                  </div>
                </li>
              </ul>
              <Link to={`${url}/edit#about-info`} eventname="Edit About info"
                className="bckgr-color2 d-inline-block padding-sm color-white font-sm border-r-10 cursor-pointer">
                <i className="fas fa-pen font-sm margin-right-sm"></i>
                Edit About Info
              </Link>
            </div>
            <div className="user-posts">
              {renderFeed(feed, userData)}
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </Fragment>
  )
}
 
export default Profile;
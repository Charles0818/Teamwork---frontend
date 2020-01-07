import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import RightSidebar from '../Sidebars/RightSidebar.component';
import { apiKey, getData } from '../../GeneralComponents/AJAX/HttpRequest';
import { trackPromise } from 'react-promise-tracker';
import { assignProperties, renderFeed } from '../../GeneralComponents/HelperFunctions/feed';
import Navbar from '../../GeneralComponents/Navbar/Navbar.component';
import { FindUser } from '../../GeneralComponents/HelperFunctions/user';

const ViewUserProfile = (props) => {
  const { match: { params: { username }, path }, userData: { userId, token }  } = props
  const [feed, updateFeed] = useState([]);
  const { firstName, lastName, photoDetails, department, jobRole, gender, address, employeeId } = FindUser(username);

  const fetchFeed = useCallback(() => {
    trackPromise(
      getData(`${apiKey}/feed/${employeeId}`, userId, token)
      .then(res => {
        const { data: { content, comments, flags } } = res;
        const feed = [...assignProperties(content, comments, flags)];
        console.log(feed);
        updateFeed(feed)
      }).catch(err => console.log(err))
    )
  }, [employeeId, token, userId]);

  useEffect(() => {
    fetchFeed()
  }, [fetchFeed])
 
  return (
    <Fragment>
      <Route path={path} component={Navbar} />
      <div className={`d-flex`}>
        <div className="profileDetails main">
          <div className="profileHeader bckgr-white padding-left-lg padding-right-lg padding-md margin-right-sm position-relative">
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
                <li className="margin-bottom-md d-flex align-items-end">
                  <i className="fas fa-map-marker-alt color2 font-md padding-right-sm"></i>
                  <span className="font-sm font-weight-600 "> {address}</span>
                </li>
              </ul>
            </div>
            <div className="user-posts">
              {renderFeed(feed, props.userData)}
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </Fragment>
  );
}

export default ViewUserProfile;
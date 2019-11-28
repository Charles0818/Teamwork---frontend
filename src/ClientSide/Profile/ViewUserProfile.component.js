import React, { Component } from 'react';
import RightSidebar from '../Sidebars/RightSidebar.component';
import Article from '../MainContent/NewsFeed/Content.component';
import { apiKey, getData } from '../../GeneralComponents/AJAX/HttpRequest';
import { trackPromise } from 'react-promise-tracker';
// import { UserConsumer } from '../../GeneralComponents/context/userContext';
// import './profile.style.css';

class ViewUserProfile extends Component {
  constructor(props) {
    super(props);
    // this.userData = this.props.users.find(user => {
    //   const username = this.props.match
    // });
    this.updateAccount = this.props.updateAccount
    this.state = {  }
  }

  // componentDidMount() {
  //   trackPromise(
  //     getData(`${apiKey}/feed/${employeeId}`, this.props.userId, this.props.authToken)
  //     .then(res => {
  //       console.log(res);
  //     }).catch(err => {
  //       console.log(err);
  //     })
  //   )
  // }
  render() { 
    console.log(this.props);
    console.log(this.props.match);
    return ( 
      <div className="d-flex">
        <div className="profileDetails main margin-right-md">
          <div className="profileHeader bckgr-white padding-left-lg padding-right-lg padding-md position-relative">
            <div className="padding-md d-flex justify-content--s-between align-items--center">
              <div className="avatar--lg cursor-pointer">
                <img src="https://res.cloudinary.com/dx5lp5drd/image/upload/v1566505654/IMG_20190615_134638_qex57k.jpg" alt="user avatar" />
              </div>
              <div className="align-self-end">
                <div className="font-lg font-weight-bold" style={{lineHeight: '30px'}}>{'Afolabi Samuel'}</div>
                <span className="gray-color">@web developer(Backend)</span>
              </div>
            </div>
          </div>
          <div className="padding-md d-flex justify-content--s-between">
            <div className="about-section bckgr-white margin-right-md padding-md padding-left-md">
              <div>
                <ul className="user_info">
                  <li className="margin-bottom-md">
                    <i className="fas fa-briefcase color2 margin-right-sm"></i>
                    <span> Department: Software Developer</span>
                  </li>
                  <li className="margin-bottom-md">
                    <i className="fas fa-location-arrow color2"></i>
                    <span> Benin City, Nigeria</span>
                  </li>
                  <li className="margin-bottom-md">
                    <i className="fas fa-location-arrow"></i>
                    <span> Benin City, Nigeria</span>
                  </li>
                  <li className="margin-bottom-md">
                    <i className="fas fa-location-arrow"></i>
                    <span> Benin City, Nigeria</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user-posts bckgr-white">
              <Article />
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
     );
  }
}

export default ViewUserProfile;
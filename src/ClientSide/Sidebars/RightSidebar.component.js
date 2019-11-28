import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../GeneralComponents/context/usersContext';
import './sidebar.style.css';
class RightSidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }

  static contextType = UsersContext;
  render() {
    let { users } = this.context;
    console.log(users);
    users = users.map((user, index) => {
      const { photoDetails, firstName, lastName, employeeId } = user;
      return { photoDetails, firstName, lastName, employeeId }
     });
     const userId = this.props.userId;
    console.log(users);
    return ( 
      <aside className="thread">
          <div className="aside right">
            <div className="padding-top-lg">
              <div className="accordion">
                <div className="accordion--btn d-flex justify-content--center">
                  <span className="font-md font-weight-600">All Colleagues</span>
                </div>
                <div className="content-wrapper">
                  <ul className="online--users">
                    {users.map((user, index) => {
                      const { photoDetails, firstName, lastName, employeeId } = user
                      return (
                        <Link to={`${userId === employeeId ? '/user/profile' : `/users/${firstName}_${lastName}`}`} key={index}>
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
        </div>
      </aside>
    );
  }
}

export default RightSidebar;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../GeneralComponents/context/usersContext';
import { widthIsMatch } from '../../GeneralComponents/HelperFunctions/mediaQueryCheck';
import '../admin.style.css';

class ListEmployees extends Component {
  constructor(props) {
      super(props);
      this._isMounted = false;
      this.state = {  }
  }

  static contextType = UsersContext;

  render() {
    const { users, addUser } = this.context;
    console.log(this.props.match);
    return (
      <section className="d-flex justify-content--center align-items--center" style={{width: '100%', height: '80vh'}}>
        <div className={`d-flex justify-content--center align-items--center ${widthIsMatch('991.98px') ? 'padding-md' : 'padding-lg'}`}>
          {users.map((user, index) => <Employee key={index} user={user} addUser={addUser} />)}
        </div>
      </section>
    );
  }
}

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  render() {
    const { photoDetails, employeeId, firstName, lastName, } = this.props.user;
    return (
      <div className="link-wrap--box">
        <div className="employee--box cursor-pointer border-r-10 overflow--h">
          <div className="user-avatar position-relative">
            <img src={photoDetails[0]} alt="user avatar" />
            <div class="action-btns d-flex nowrap">
              <i class="fas fa-trash margin-right-sm font-md border-r-circle danger-text"></i>
              <Link to={`/user/${firstName}_${lastName}`}>
                <i class="fas fa-eye margin-right-sm font-md border-r-circle color-white"></i>
              </Link>
            </div>
          </div>
          <div className="padding-sm color-dark bckgr-white">
            <div className="font-sm padding-sm font-weight-bold color-dark">{`${firstName} ${lastName}`}</div>
          </div>
        </div>
      </div>
    )
  }
}

class ConfirmAction extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div class="d-flex justify-content--center align-items--center">
        <div className="font-md">
          Are you sure you want to permanently delete this employee with the name Charles Omoregie?
        </div>
        <div className="options">
          <div className="btn">Yes</div>
          <div className="btn close">No</div>
        </div>
      </div>
     );
  }
}

export default ListEmployees;

export { Employee, ConfirmAction };
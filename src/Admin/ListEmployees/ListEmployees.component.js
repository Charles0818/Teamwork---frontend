import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { apiKey, getData } from '../../GeneralComponents/AJAX/HttpRequest';
import { UsersContext } from '../../GeneralComponents/context/usersContext';
import '../admin.style.css';

class ListEmployees extends Component {
  constructor(props) {
      super(props);
      this.state = {  }
  }

  static contextType = UsersContext;

  componentWillMount() {
    const { users, addUser } = this.context;
    if(users.length <= 0) {
      const { userId, token } = this.props.userData;
      getData(`${apiKey}/auth/users`, userId, token)
      .then(res => {
        const { status, data } = res;
        addUser(data)
      }).catch(err => {
        console.log(err);
      })
    }else return
  }
  render() {
    const { users, addUser } = this.context;
    console.log(this.props.match);
    return (
      <section className="d-flex d-flex justify-content--center align-items--center" style={{width: '100%', height: '80vh'}}>
        <div className="d-flex justify-content--center align-items--center padding-lg">
          {users.map((user, index) => <Employee key={index} user={user} />)}
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
    const { photoDetails, EmployeeId, firstName, lastName, } = this.props.user;
    return (
      <div className="link-wrap--box">
        <div className="employee--box bckgr-white cursor-pointer">
          <div className="user-avatar margin-bottom-sm position-relative">
            <img src={photoDetails[0]} alt="user avatar" />
            <div class="action-btns">
              <i class="fas fa-trash margin-right-sm font-md border-r-circle danger-text"
              onClick={this.confirmAction()}></i>
              <Link to={`/user/${firstName}_${lastName}`}>
                <i class="fas fa-eye margin-right-sm font-md border-r-circle primary-color"></i>
              </Link>
            </div>
          </div>
          {/* <div className="text-align-center color-dark"> */}
            {/* <i className="fas fa-user-plus icon margin-bottom-sm font-lg color2"></i>  */}
            <div className="font-sm padding-sm font-weight-bold color-dark">{`${firstName} ${lastName}`}</div>
          {/* </div> */}
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
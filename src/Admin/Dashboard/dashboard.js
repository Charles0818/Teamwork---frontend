import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../GeneralComponents/modalComponent/modal.component';
import CreateUser from '../../GeneralComponents/FormComponent/signUp.component';
import '../admin.style.css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.addUser = this.props.addUser;
    this.users = this.props.users;
    this.state = { 
      isModalOpen: false
      }
  }

  toggleModal = (event)=> {
    event.preventDefault();
    const target = event.target;
    console.log(target);
    const targetClassList = [...target.classList];
    console.log(targetClassList);
    (targetClassList.includes('close')) ? (
      this.setState({isModalOpen: false })
      ) : (
        this.setState({ isModalOpen: true})
        )
    console.log(this.state.isModalOpen);
  }

  render() {
    const { match } = this.props;
    console.log(this.props.match);
    return (
        <section className=" add-bckgr--img d-flex d-flex justify-content--center align-items--center" style={{width: '100%', height: '88vh', overflow: 'hidden'}}>
          <div className="dashboard-box d-flex justify-content--center align-items--center padding-lg">
            <div className="link-wrap--box"
            onClick={(event) => this.toggleModal(event)}>
              <div className="box padding-md bckgr-white d-flex justify-content--center align-items--center">
                <div className="text-align-center color-dark">
                  <i className="fas fa-user-plus icon margin-bottom-sm font-lg color2"></i> 
                  <div className="font-sm font-weight-bold">Create User Account</div>
                </div>
              </div>
            </div>

            <Link to={`${match.url}/employees`} className="link-wrap--box">
              <div className="box padding-md bckgr-white d-flex justify-content--center align-items--center">
                <div className="text-align-center color-dark">
                  <i className="fas fa-users icon margin-bottom-sm font-lg color2"></i> 
                  <div className="font-sm font-weight-bold">All Employees</div>
                </div>
              </div>
            </Link>

            <Link to={`${match.url}/forgot-password`} className="link-wrap--box">
              <div className="box padding-md bckgr-white d-flex justify-content--center align-items--center">
                <div className="text-align-center color-dark">
                  <i className="fas fa-key icon margin-bottom-sm font-lg color2"></i> 
                  <div className="font-sm font-weight-bold">Create User Account</div>
                </div>
              </div>
            </Link>
          </div>
          <Modal toggleModal = {this.toggleModal} isModalOpen = {this.state.isModalOpen} contentTitle ="Create Employee Account" contentBody = {<CreateUser />} />
        </section>
    );
  }
}

export default AdminDashboard;
import React, { Component } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { withRouter } from 'react-router-dom';
import { modifyData, apiKey } from '../../GeneralComponents/AJAX/HttpRequest';

class EditProfile extends Component {
  constructor(props) {
      super(props);
      this.userData = this.props.userData
      this.state = { 
        email: this.userData.email,
        address: this.userData.address,
        gender: this.userData.gender,
        file: null,
        fileURL: this.userData.photoDetails[0],
       }
  }

  handleUserInput = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if(name === 'file') {
      this.setState({
        fileURL: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0]
      });
      return
    }
    this.setState({[name]: value}, () => {
    console.log(this.state);
    })
  }

  updateAvatar = (event) => {
    event.preventDefault();
    let {users, addUser, updateAccount, userData, userData: { userId, token }, history: { push } } = this.props;
    let {file } = this.state;
    const formData = new FormData();
    formData.append('files', file);
    formData.append('userId', userId)
    event.target.value = 'Publishing...'
    trackPromise(
      modifyData(`${apiKey}/auth/users/${userId}`, formData, token, true)
      .then(res => {
        const { data: { photoDetails } } = res;
        console.log(res);
        userData.photoDetails = photoDetails;
        updateAccount(userData);
        users = users.map(user => {
          if (user.employeeId === userId) {
            user.photoDetails = photoDetails;
          }
          return user;
        });
        addUser(users);
        push('/user/profile');
      }).catch(err => {
        console.log(err)
      })
    )
  }

  render() { 
    return ( 
      <div className="linear-grad-bckgr d-flex justify-content--center align-items--center">
        <main className="padding-lg">
          <div className="wrapper d-flex">
            <aside className="bckgr-white padding-lg margin-right-md margin-bottom-md">
              <section className="" id="profile-pictire_username">
                <h2 className="font-lg margin-bottom-md">Change Profile Picture</h2>
                <form className="form" encType="multipart/form-data">
                  <div className="file_display padding-bottom-sm"
                    style={{width: '200px', height: 'auto', display: `${this.state.fileURL === null ? 'none' : 'inline-block'}`}}>
                    <img src={this.state.fileURL} alt="" style={{width: '100%', height:'auto'}} />
                  </div>
                  <div className="padding-bottom-md">
                    <label className="btn--file d-inline-block">
                      <div className="upload--icon">
                        <i className="far fa-image font-md d-inline-block"></i>
                        <span className="padding-left-sm font-sm">{'Upload'}</span>
                      </div>
                      <input type="file" name="file" multiple={false} onChange = {(event) => this.handleUserInput(event)} />
                    </label>
                    <span className="error-msg italic padding-sm"></span>
                  </div>
                  <input onClick={(event) => this.updateAvatar(event)} type="submit" value="Update" className="submit--btn" />
                </form>
              </section>
            </aside>
            <div className="bckgr-white" id="about-info">
              <section className="padding-lg">
                <h2 className="font-lg margin-bottom-md">Update your info</h2>
                <form className="form" method="POST" style={{width: '450px'}}>
                  <label> Email
                  <input onChange={(event) => this.handleUserInput(event)} type="email" name="email" 
                    placeholder="enter new email" className="form-control"
                    value={this.state.email}
                  />
                  </label>
                  <div className="padding-bottom-sm padding-top-sm">
                    <h4 className="heading md padding-bottom-sm">Gender</h4>
                    <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md padding-bottom-xsm "> <span>male</span>
                      <input onChange={(event) => this.handleUserInput(event)} type="radio" value="male" name="gender" className="form-control" id="web_dev" />
                      <span className="checkmark border-r-circle"></span>
                    </label>
                    <label className="check radio position-relative padding-left-md margin-bottom-sm cursor-pointer font-md ">female
                      <input onChange={(event) => this.handleUserInput(event)} type="radio" value="female" name="gender" className="form-control" id="female" />
                      <span className="checkmark border-r-circle"></span>
                    </label>
                  </div>
                  <label> Address
                    <input onChange={(event) => this.handleUserInput(event)} type="text" name="address"
                      placeholder="Enter Address" className="form-control"
                      value={this.state.address} />
                  </label>
                  <input onClick={(event) => this.handleSubmit(event)} type="submit" value="Create User"
                    className="submit--btn" />
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(EditProfile);
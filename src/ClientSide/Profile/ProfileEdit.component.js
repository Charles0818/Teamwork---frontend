import React, { Component } from 'react';

class EditProfile extends Component {
  constructor(props) {
      super(props);
      this.state = { 
        email: '',
        address: '',
        gender: '',
        username: {
          firstname: '',
          lastName: ''
        },
        jobRole: '',
        department: ''
       }
  }

  handleUserInput = (event) => {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }
  render() { 
    return ( 
      <div className="linear-grad-bckgr d-flex justify-content--center align-items--center">
        <main className="padding-lg">
          <div className="d-flex">
              <aside className="bckgr-white margin-right-md">
                <section className="" id="profile-pictire_username">
                  <h2 className="font-lg margin-bottom-md">Change Profile Picture</h2>
                  <form className="form" enctype="multipart/form-data">
                    <div className="file_upload">
                      <label className="btn--file">
                        <div className="upload--icon">
                          <i className="fa fa-camera"></i>
                          Click to add file
                        </div>
                        <input onChange={(event) => this.handleUserInput(event)} type="file" name="file" />
                      </label>
                    </div>
                  </form>
                </section>
              </aside>
              <div className="bckgr-white" id="about-info">
                <section className="padding-lg">
                  <h2 className="font-lg margin-bottom-md">Update your info</h2>
                  <form className="form" method="POST" style={{width: '450px'}}>
                    <label> Email
                    <input onChange={(event) => this.handleUserInput(event)} type="email" name="email" 
                      placeholder="" className="form-control"
                      value={this.state.email}
                    />
                    </label>
                    <label> Job Role
                      <input onChange={(event) => this.handleUserInput(event)} type="text" name="jobRole"
                        placeholder="Job Role (e.x Frontend Web Developer)" className="form-control"
                        value={this.state.jobRole} />
                    </label>
                    <label> Department
                      <input onChange={(event) => this.handleUserInput(event)} type="text" name="department"
                        placeholder="Employee's department" className="form-control"
                        value={this.state.department} />
                    </label>
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

export default EditProfile;
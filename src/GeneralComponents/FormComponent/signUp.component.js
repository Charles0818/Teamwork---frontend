import React, { Component } from 'react';
import './form.css';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <form className="form" method="POST">
                <label> First Name
                    <input type="text" name="firstName" placeholder="Enter FirstName" className="form-control" />
                </label>
                <label> Last Name
                    <input type="text" name="lastName" placeholder="Enter LastName" className="form-control" />
                </label>
                <label> Email
                    <input type="email" name="email" 
                        placeholder="Enter employee's email" className="form-control" 
                    />
                </label>
                <label> Password
                    <input type="password" name="password" 
                        placeholder="Create employee's password" className="form-control" 
                    />
                </label>
                <label> Gender
                    <input type="text" name="location" 
                        placeholder="Enter City, Country" className="form-control" 
                    />
                </label>
                <label> Job Role
                    <input type="text" name="job--role" placeholder="Job Role (e.x Frontend Web Developer)" className="form-control" />
                </label>
                <label> Department
                    <input type="text" name="department" placeholder="Employee's department" className="form-control" />
                </label>
                <label> Address
                    <input type="text" name="address" placeholder="Enter Address" className="form-control" />
                </label>
                <input type="submit" value="Create User" className="submit--btn" />
            </form>
         );
    }
}
 
export default CreateUser;
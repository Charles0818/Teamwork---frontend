import React, { createContext } from 'react';
// import { UsersContext } from '../FormComponent/login.component';

export const UsersContext = createContext();
export const UsersContextConsumer = UsersContext.Consumer;
class UsersContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      addUser: changes => this.addUser(changes)
    }
  }

  addUser = changes => {
    this.setState({
      users: [...changes]
    })
  }

  // componentDidUpdate() {
  //   const avatar = {
  //     male: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/businessman-310819_640_guvqva.png',
  //     female: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/user-310807_640_wgamok.png'
  //   };
  //   let users = JSON.parse(JSON.stringify(this.state.users));
  //   users = users.map(user => {
  //     console.log(user);
  //     let { photoDetails, gender } = user;
  //     if(photoDetails === null) {
  //       user.photoDetails = gender === 'male' ? [avatar.male, null] : [ avatar.female, null];
  //     }
  //     return user;
  //   })
  //   this.setState({
  //     users: users
  //   })
  // }

  render() {
    console.log(this.state);
    return (
      <UsersContext.Provider value={this.state}>
        {this.props.children}
      </UsersContext.Provider>
    )
  }
}


export default UsersContextProvider;
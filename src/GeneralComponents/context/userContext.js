import React, { createContext } from 'react';
// import { UserContext } from '../FormComponent/login.component';

export const UserContext = createContext();
export const UserConsumer = UserContext.Consumer;
class UserContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        userId: null,
        token: null,
        account_type: null,
        jobRole: null,
        department: null,
        gender: null,
      },
      updateAccount: changes => this.updateAccount(changes)
    }
  }

  componentDidUpdate() {
    const avatar = {
      male: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/businessman-310819_640_guvqva.png',
      female: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/user-310807_640_wgamok.png'
    }
    let data = JSON.parse(JSON.stringify(this.state.data));
    let { photoDetails, gender } = data
    if(photoDetails === null) {
      data.photoDetails = gender === 'male' ? [avatar.male, null] : [ avatar.female, null];
      this.setState({
        data: data
      })
    }else return
  }

  updateAccount = changes => {
    this.setState({
      ...changes
    })
  }

  render() {
    console.log(this.state)
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}


export default UserContextProvider;
import React, { createContext, useContext } from 'react';

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

export const useAccount = () => {
  const { updateAccount } = useContext(UserContext);
  const logout = () => {
    localStorage.removeItem('jwtToken');
    const data = { isLoggedIn: false }
    updateAccount(data);
  }
  return { logout };
}
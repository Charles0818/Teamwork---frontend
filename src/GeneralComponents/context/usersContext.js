import React, { createContext } from 'react';
// import { UsersContext } from '../FormComponent/login.component';

export const UsersContext = createContext();
export const UsersContextConsumer = UsersContext.Consumer;
class UsersContextProvider extends React.Component {
  _isMounted = false;
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

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

 
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
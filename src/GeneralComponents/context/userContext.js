import React, { useContext } from 'react';
import { UserContext } from '../FormComponent/login.component';

class UserContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: UserContext
        }
    }
    render() {
        console.log(this.data);
        return (
            <UserContext.Provider value={this.state.data}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
    
}


export { UserContext, UserContextProvider };
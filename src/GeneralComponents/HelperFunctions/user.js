import { useContext } from 'react';
import { UsersContext } from '../context/usersContext';
export const FindUser = (username) => {
    const { users } = useContext(UsersContext);
    let user = username.split('_');
    const firstName = user[0];
    const lastName = user[1];
    const userDetails = users.find(userObj => userObj.firstName === firstName && userObj.lastName === lastName);
    const { photoDetails, department, jobRole, gender, interests, address, employeeId } = userDetails;
    return { firstName, lastName, photoDetails, department, jobRole, gender, interests, address, employeeId }
}
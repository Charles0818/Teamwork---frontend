// import { useContext } from 'react';
// import { UsersContext } from './usersContext';
// import { UserContext } from './userContext';

// export const FindUsername = (id) => {
//     console.log(id);
//     const { users } = useContext(UsersContext);
//     let { data } = useContext(UserContext);
//     data.employeeId = data.userId;
//     data = [data, ...users];
//     console.log(data)
//     console.log(users);
//     const userData =  users.find(user => parseInt(user.employeeId, 10) === parseInt(id, 10))
//     console.log(userData)
//     const { firstName, lastName } = userData;
//     const username = `${firstName} ${lastName}`;
//     return username
// }
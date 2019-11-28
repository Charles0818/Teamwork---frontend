export const addDefaultAvatar = (users) => {
    const avatar = {
        male: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/businessman-310819_640_guvqva.png',
        female: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/user-310807_640_wgamok.png'
    };
    users = JSON.parse(JSON.stringify(users)).map(user => {
        console.log(user);
        let { photoDetails, gender } = user;
        if(photoDetails === null) {
            user.photoDetails = gender === 'male' ? [avatar.male, null] : [ avatar.female, null];
        }
        return user;
    })
    return users;
}
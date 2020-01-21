export const addDefaultAvatar = (user) => {
    const avatar = {
        male: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/businessman-310819_640_guvqva.png',
        female: 'https://res.cloudinary.com/dx5lp5drd/image/upload/v1574682959/user-310807_640_wgamok.png'
    };
    let { photoDetails, gender } = user;
    console.log(photoDetails, gender);
    console.log(user);
    if(photoDetails === null) {
        user.photoDetails = gender === 'male' ? [avatar.male, null] : [ avatar.female, null];
    }
return user;
}
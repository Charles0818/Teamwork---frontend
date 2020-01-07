export const stringifyDate = (timestamp) => {
    const date = new Date(timestamp);
    const currentDate = new Date();
    const contentDay = date.getDay();
    const currentDay = currentDate.getDay()
    const differenceInDays =( currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    switch(differenceInDays) {
        case (differenceInDays === 1 && currentDay - contentDay === 1) :
            return `yesterday at ${timeFormat_12hr(date)}`
        case (differenceInDays === 0 && currentDay === contentDay) :
            return `today at ${timeFormat_12hr(date)}`
        case (differenceInDays > 1):
            return `${getWeekDay(date)}`
        default:
            return `${getMonthName(date)} ${date.getDate()} at ${timeFormat_12hr(date)}`
    }
    
}

const getMonthName = (date) => {
    const monthNames = ['Jan', 'Feb', "Mar", 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[date.getMonth()]
}

const getWeekDay = (date) => {
    const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    return weekDays[date.getDay()]
}
const timeFormat_12hr = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const season = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12 ? hours % 12 : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const time = `${hours}:${minutes} ${season}`;
    return time
}

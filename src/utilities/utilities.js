export const timeStampToDate = (timestamp) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return {
        year: timestamp.toDate().getFullYear(),
        month: monthNames[timestamp.toDate().getMonth()],
        day: timestamp.toDate().getDate(),
        minute: timestamp.toDate().getMinutes(),
        hour: timestamp.toDate().getHours(),
    }
}
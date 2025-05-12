export function getLocalDate() {
    let now = new Date();
    let date = `${now.getDate()}/${now.getMonth()+1}`;
    let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    let dateTime = `${time} ${date}`;

    return {date: dateTime, timestamp: now.getTime()}
}
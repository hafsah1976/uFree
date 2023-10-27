import * as dayjs from 'dayjs';

export function monthAndDay(date) {
    return dayjs(date).format('MMM D');
}

export function dayMonthDate(date) {
    return dayjs(date).format('dddd, MMM D');
}

export function to12Hour(time) {
    if (time === 0) return '12:00 AM';
    if (time === 12) return '12:00 PM';
    if (time === 24) return '11:59 PM';
    if (time > 12) return `${numberToHour(time - 12)} PM`;
    return `${numberToHour(time)} AM`;
}

export function getDateFromWeekday(dayOfWeek, weekStartDate) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return dayjs(weekStartDate).add(daysOfWeek.indexOf(dayOfWeek), 'day');
}

export function toBeginningOfWeek(date) {
    let myDate = dayjs(date);

    // if it's Sunday, subtract one day
    if (myDate.day() === 0) myDate = myDate.subtract(1, 'day');

    return myDate.day(1).toDate();
}

export function hourToNumber(time) {
    let [hour, minute] = time.split(':');
    hour = Number(hour);
    minute = parseFloat((Number(minute) / 60).toFixed(3));  // get minutes as a decimal
    return hour + minute;
}

export function numberToHour(num) {
    num = num.toFixed(1);
    let [hour, minute] = num.split('.');
    minute = parseFloat('0.' + minute) * 60;
    minute = String(minute);
    if (minute.length === 1) minute = '0' + minute;

    return `${hour}:${minute}`;
}
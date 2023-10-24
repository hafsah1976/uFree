import * as dayjs from 'dayjs';

export function monthAndDay(date) {
    return dayjs(date).format('MMM D');
}

export function dayMonthDate(date) {
    return dayjs(date).format('dddd, MMM D');
}

export function to12Hour(time) {
    if (time === 0) return '12 AM';
    if (time === 12) return '12 PM';
    if (time === 24) return '11:59 PM';
    if (time > 12) return `${time - 12} PM`;
    return `${time} AM`;
}

export function getDateFromWeekday(dayOfWeek, weekStartDate) {
    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    return dayjs(weekStartDate).add(daysOfWeek.indexOf(dayOfWeek), 'day');
}
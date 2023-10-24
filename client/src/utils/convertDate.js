import * as dayjs from 'dayjs';

export function monthAndDay(date) {
    return dayjs(date).format('MMM D');
}
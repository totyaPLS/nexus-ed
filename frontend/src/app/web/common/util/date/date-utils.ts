import { DatePipe } from '@angular/common';

export function formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') ?? '';
}

export function toNexusTime(value: string) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

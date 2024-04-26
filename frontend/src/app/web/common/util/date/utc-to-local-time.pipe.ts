import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'nexusTime'
})
export class UtcToLocalTimePipe implements PipeTransform {

    transform(value: any): string {
        if (!value) return '';

        const date = new Date(value);
        const year = date.getFullYear();
        const month = this.padZero(date.getMonth() + 1);
        const day = this.padZero(date.getDate());
        const hours = this.padZero(date.getHours());
        const minutes = this.padZero(date.getMinutes());

        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    private padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
    }

}

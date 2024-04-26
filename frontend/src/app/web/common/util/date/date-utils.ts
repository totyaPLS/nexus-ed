import { DatePipe } from '@angular/common';

export function formatDate(date: Date): string {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss') ?? '';
}

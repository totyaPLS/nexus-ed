import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[grade]'
})
export class GradeClassDirective {
    @Input() grade!: number; // Input binding to receive the grade

    @HostBinding('class')
    get elementClass() {
        let className = 'grade-badge '
        switch(this.grade) {
            case 1:
                className += 'one';
                break;
            case 2:
                className += 'two';
                break;
            case 3:
                className += 'three';
                break;
            case 4:
                className += 'four';
                break;
            case 5:
                className += 'five';
                break;
            default:
                className += '';
                break;
        }
        return className;
    }

    constructor() { }
}

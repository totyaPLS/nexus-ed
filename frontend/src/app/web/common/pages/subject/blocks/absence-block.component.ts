import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Absence} from "../../../util/models/absence-models";
import {ABSENCE_STATUS, getEnumName} from "../../../util/enums/Subject";
import {DatePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-absence-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
        RouterLink
    ],
  templateUrl: './absence-block.component.html',
  styleUrl: './absence-block.component.scss'
})
export class AbsenceBlockComponent {
    @Input() absences!: Absence[];
    protected readonly getEnumName = getEnumName;
    protected readonly ABSENCE_STATUS = ABSENCE_STATUS;
}

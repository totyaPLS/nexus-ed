import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Absence} from "../../../util/models/absence-models";

@Component({
  selector: 'app-absence-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule
    ],
  templateUrl: './absence-block.component.html',
  styleUrl: './absence-block.component.scss'
})
export class AbsenceBlockComponent {
    @Input() absences!: Absence[];
}

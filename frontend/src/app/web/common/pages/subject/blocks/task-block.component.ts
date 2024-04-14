import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Task} from "../../../util/models/task-models";

@Component({
  selector: 'app-task-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule
    ],
  templateUrl: './task-block.component.html',
  styleUrl: './task-block.component.scss'
})
export class TaskBlockComponent {
    @Input() tasks!: Task[];
}

import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Task} from "../../../util/models/task-models";
import {DatePipe} from "@angular/common";
import {getEnumName, TASK_TYPE} from "../../../util/enums/Subject";

@Component({
  selector: 'app-task-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe
    ],
  templateUrl: './task-block.component.html',
  styleUrl: './task-block.component.scss'
})
export class TaskBlockComponent {
    @Input() tasks!: Task[];
    protected readonly getEnumName = getEnumName;
    protected readonly TASK_TYPE = TASK_TYPE;
}

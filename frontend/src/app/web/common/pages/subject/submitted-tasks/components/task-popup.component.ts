import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgClass, NgIf} from "@angular/common";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";
import {CheckboxModule} from "primeng/checkbox";
import {CalendarModule} from "primeng/calendar";
import {SubmittableTask} from "../../../../util/models/announcement-models";
import {NexusTimeModule} from "../../../../util/date/nexus-time.module";
import {GradeType, WeightType} from "../../../../util/enums/Commons";
import {GradeForm} from "../../../../util/models/form-models";
import {ExtractFromControl} from "../../../../util/type-utils";
import {TaskGradeReq} from "../../../../util/models/grade-models";
import {Observable} from "rxjs";
import {SubmittableTasksRepository} from "../../../../state/submittable-tasks.repository";

@Component({
    selector: 'app-task-popup',
    standalone: true,
    imports: [
        DialogModule,
        DropdownModule,
        FormsModule,
        NgClass,
        RadioButtonModule,
        InputNumberModule,
        InputTextModule,
        NgIf,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        CommonModule,
        PasswordModule,
        CheckboxModule,
        CalendarModule,
        NexusTimeModule,
    ],
    templateUrl: './task-popup.component.html',
    styles: [`
        .container {
            display: flex;
            align-items: center;
        }

        .inline-item {
            margin-right: 10px;
        }
    `],
})
export class TaskPopupComponent implements OnInit {
    @Input() detailsDialog!: boolean;
    @Input() task!: SubmittableTask;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveGradeEvent = new EventEmitter<TaskGradeReq>();

    protected readonly WeightType = WeightType;
    protected readonly GradeType = GradeType;

    formGroup: FormGroup<GradeForm>;
    loading$: Observable<boolean>;

    constructor(private submittableTasksRepo: SubmittableTasksRepository) {
        this.loading$ = submittableTasksRepo.upLoading$;
        this.formGroup = new FormGroup<GradeForm>({
            weight: new FormControl(null, Validators.required),
            grade: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        if (this.task.grade) {
            this.formGroup.controls.grade.setValue(this.task.grade.gradeValue);
            this.formGroup.controls.weight.setValue(this.task.grade.weight);
        }
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveGrading() {
        const formValues: ExtractFromControl<GradeForm> = this.formGroup.getRawValue();
        const taskGradeReq: TaskGradeReq = {
            studentId: this.task.studentId,
            grade: formValues.grade!,
            weight: formValues.weight!,
            subTaskId: this.task.id,
        }
        this.saveGradeEvent.emit(taskGradeReq);
    }

}

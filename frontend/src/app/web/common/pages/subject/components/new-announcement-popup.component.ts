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
import {getEnumName, SubjectDetailType, TASK_TYPE, TaskType} from "../../../util/enums/Commons";
import {EditorModule} from "primeng/editor";
import {AnnouncementForm} from "../../../util/models/form-models";
import {ExtractFromControl} from "../../../util/type-utils";
import {SelectItem} from "primeng/api";

@Component({
    selector: 'app-new-announcement-popup',
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
        EditorModule,
    ],
    templateUrl: './new-announcement-popup.component.html',
    styles: [`
      .task-box {
          min-height: 200px;
      }
    `],
})
export class NewAnnouncementPopupComponent implements OnInit {
    @Input() announcementDialog!: boolean;
    @Input() announcementType!: string;
    @Input() classId!: number;
    @Input() subjectId!: number;
    @Output() closeDialogEvent = new EventEmitter<void>();
    @Output() saveAnnouncementEvent = new EventEmitter<ExtractFromControl<AnnouncementForm>>();

    title!: string;
    formGroup: FormGroup<AnnouncementForm>;
    types: SelectItem[] = [];

    constructor() {
        this.formGroup = new FormGroup<AnnouncementForm>({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            deadline: new FormControl(null),
            type: new FormControl(null),
        });
        this.types = [
            { label: getEnumName(TaskType.OPTIONAL, TASK_TYPE), value: TaskType.OPTIONAL },
            { label: getEnumName(TaskType.HOMEWORK, TASK_TYPE), value: TaskType.HOMEWORK },
            { label: getEnumName(TaskType.TEST, TASK_TYPE), value: TaskType.TEST },
            { label: getEnumName(TaskType.FINAL, TASK_TYPE), value: TaskType.FINAL },
        ]
    }

    ngOnInit(): void {
        if (this.isTaskType) {
            this.title = 'feladat';
            this.formGroup.controls.deadline.setValidators(Validators.required);
            this.formGroup.controls.type.setValidators(Validators.required);
        } else {
            this.title = 'közlemény';
        }
    }

    get isTaskType() {
        return this.announcementType === SubjectDetailType.TASKS;
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    get isFormInvalid() {
        return this.formGroup.invalid;
    }

    saveAnnouncement() {
        const formValues: ExtractFromControl<AnnouncementForm> = this.formGroup.getRawValue();
        this.saveAnnouncementEvent.emit(formValues);
    }

    onEditorChange() {
        this.formGroup.controls.description.updateValueAndValidity();
    }
}

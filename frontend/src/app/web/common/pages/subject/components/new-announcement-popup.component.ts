import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output
} from '@angular/core';
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
import {MessageService, SelectItem} from "primeng/api";
import {AnnouncementReq} from "../../../util/models/announcement-models";
import {formatDate} from "../../../util/date/date-utils";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AnnouncementService} from "../../../rest/announcement.service";
import {NexLoadingModule} from "../../../../../config/loading/nex-loading.module";
import {distinctUntilChanged, Observable} from "rxjs";
import {AnnouncementRepository} from "../../../state/announcements.repository";
import {ActivatedRoute} from "@angular/router";

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
        NexLoadingModule,
    ],
    templateUrl: './new-announcement-popup.component.html',
    styles: [`
      .task-box {
          min-height: 200px;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAnnouncementPopupComponent implements OnInit {
    @Input() announcementDialog!: boolean;
    @Input() announcementType!: string;
    @Output() closeDialogEvent = new EventEmitter<void>();

    subjectId!: number;
    classId!: number;
    title!: string;
    formGroup: FormGroup<AnnouncementForm>;
    types: SelectItem[] = [];

    destroyRef = inject(DestroyRef);
    loading$: Observable<boolean>;

    constructor(private announcementService: AnnouncementService,
                private announcementRepo: AnnouncementRepository,
                private route: ActivatedRoute,
                private messageService: MessageService) {
        this.loading$ = this.announcementRepo.upLoading$.pipe(
            distinctUntilChanged(),
        );
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);

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
        const announcementReq: AnnouncementReq = {
            subjectId: this.subjectId,
            classId: this.classId,
            title: formValues.title!,
            description: formValues.description!,
            task: formValues.deadline ? {
                deadline: formatDate(formValues.deadline),
                type: formValues.type!,
            } : null,
        }
        this.announcementService.uploadAnnouncement(announcementReq).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres',
                    detail: `${this.isTaskType ? 'Feladat' : 'Közlemény'} rögzítve`,
                    life: 3000,
                });
                this.announcementService.listAllAnnouncementAfterUpload(this.subjectId, this.classId)
                    .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.hideDialog());
            }
        );
    }

    onEditorChange() {
        this.formGroup.controls.description.updateValueAndValidity();
    }
}

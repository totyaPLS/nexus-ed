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
import {UserService} from "../../../rest/user.service";
import {LessonService} from "../../../rest/lesson.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService, SelectItem} from "primeng/api";
import {combineLatestWith, distinctUntilChanged, map, Observable} from "rxjs";
import {UserRepository} from "../../../state/users.repository";
import {LessonsRepository} from "../../../state/lessons.repository";
import {MultiSelectModule} from "primeng/multiselect";
import {User, UserDropdown} from "../../../util/models/user-models";
import {Lesson} from "../../../util/models/timetable-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {toNexusTime} from "../../../util/date/date-utils";
import {ABSENCE_STATUS, AbsenceStatus, getEnumName} from "../../../util/enums/Commons";
import {AbsenceForm} from "../../../util/models/form-models";
import {ExtractFromControl} from "../../../util/type-utils";
import {AbsenceReq} from "../../../util/models/absence-models";
import {AbsenceService} from "../../../rest/absence.service";

@Component({
    selector: 'app-new-absence-popup',
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
        MultiSelectModule,
    ],
    templateUrl: './new-absence-popup.component.html',
    styles: [`
      .absence-box {
          min-height: 300px;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAbsencePopupComponent implements OnInit {
    @Input() absenceDialog!: boolean;
    @Output() closeDialogEvent = new EventEmitter<void>();

    subjectId!: number;
    classId!: number;
    loading$: Observable<boolean>;
    students$!: Observable<UserDropdown[]>;
    lessons$!: Observable<Lesson[]>;
    formGroup!: FormGroup<AbsenceForm>;

    statusList: SelectItem[] = [
        {label: getEnumName(AbsenceStatus.UNEXCUSED, ABSENCE_STATUS), value: AbsenceStatus.UNEXCUSED, },
        {label: getEnumName(AbsenceStatus.EXCUSED, ABSENCE_STATUS), value: AbsenceStatus.EXCUSED, },
        {label: getEnumName(AbsenceStatus.PENDING, ABSENCE_STATUS), value: AbsenceStatus.PENDING, },
    ];

    destroyRef = inject(DestroyRef);

    constructor(private userService: UserService,
                private lessonService: LessonService,
                private absenceService: AbsenceService,
                private userRepo: UserRepository,
                private lessonRepo: LessonsRepository,
                private route: ActivatedRoute,
                private messageService: MessageService) {
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);
        this.initRepoData();
        this.initFormData();
        this.loading$ = this.userRepo.listLoading$.pipe(
            combineLatestWith(this.lessonRepo.listLoading$),
            map(loadingValues => loadingValues.some(v => v)),
            distinctUntilChanged()
        );
    }

    private initRepoData() {
        this.students$ = this.userRepo.users$.pipe(
            map((users: User[]) => {
                return users.map(user => ({
                    uid: user.uid,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dropDownValue: `${user.lastName} ${user.firstName} (${user.uid})`
                }));
            })
        );
        this.lessons$ = this.lessonRepo.lessons$.pipe(
            map((lessons: Lesson[]) => lessons.map(lesson => ({
                ...lesson,
                start: toNexusTime(lesson.start)
            })))
        );
    }

    private initFormData() {
        this.formGroup = new FormGroup<AbsenceForm>({
            user: new FormControl(null, Validators.required),
            lesson: new FormControl(null, Validators.required),
            status: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        this.userService.listStudentUsersByClassId(this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        this.lessonService.listPastLessonsBySubjectId(this.subjectId, this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    saveAbsence() {
        const formValues: ExtractFromControl<AbsenceForm> = this.formGroup.getRawValue();
        const absenceReq: AbsenceReq = {
            studentId: formValues.user?.uid!,
            lessonId: formValues.lesson?.id!,
            status: formValues.status?.value,
            classId: this.classId,
            subjectId: this.subjectId,
        }
        this.absenceService.uploadAbsence(absenceReq).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres',
                    detail: 'Hiányzás rögzítve',
                    life: 3000,
                });
                this.hideDialog();
            }
        );
    }
}

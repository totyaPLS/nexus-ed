import {Component, DestroyRef, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClassDropdown, SubjectDropdown} from "../../../../../common/util/models/user-models";
import {TeacherForm} from "../../../../../common/util/models/form-models";
import {SubjectRepository} from "../../../../../common/state/subjects.repository";
import {distinctUntilChanged, Observable} from "rxjs";
import {ClassRepository} from "../../../../../common/state/classes.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ClassService} from "../../../../../common/rest/class.service";
import {SubjectService} from "../../../../../common/rest/subject.service";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
    selector: 'app-teacher-creation',
    standalone: true,
    imports: [
        DropdownModule,
        ReactiveFormsModule,
        MultiSelectModule
    ],
    template: `
        <form [formGroup]="teacherForm">
            <div class="grid student-creation-box">
                <div class="col-6">
                    <label for="subjects">Tanítandó tantárgyak</label>
                    <p-multiSelect [options]="subjectDropdowns" placeholder="Kiválasztás..."
                                   optionLabel="dropDownValue" class="multiselect-custom" display="chip"
                                   formControlName="subjectControl" filterBy="dropDownValue" id="subjects"
                                   (onChange)="triggerFormBySubject()">
                        <ng-template let-subject pTemplate="item">
                            <div class="flex align-items-center">
                                <div>{{ subject.dropDownValue }}</div>
                            </div>
                        </ng-template>
                    </p-multiSelect>
                </div>

                <div class="col-6">
                    <label for="classes">Tanítandó osztályok</label>
                    <p-multiSelect [options]="classDropdowns" placeholder="Kiválasztás..."
                                   optionLabel="dropDownValue" class="multiselect-custom" display="chip"
                                   formControlName="classControl" filterBy="dropDownValue" id="classes"
                                   (onChange)="triggerFormByClass()">
                        <ng-template let-class pTemplate="item">
                            <div class="flex align-items-center">
                                <div>{{ class.dropDownValue }}</div>
                            </div>
                        </ng-template>
                    </p-multiSelect>
                </div>
            </div>
        </form>
    `,
    styles: [`
        .student-creation-box {
            min-height: 300px;
        }
    `]
})

export class TeacherCreationComponent implements OnInit, OnDestroy {
    @Output() teacherFormEvent = new EventEmitter<FormGroup<TeacherForm>>();

    loading$: Observable<boolean>;
    subjectDropdowns!: SubjectDropdown[];
    classDropdowns!: ClassDropdown[];
    teacherForm: FormGroup<TeacherForm>;

    destroyRef = inject(DestroyRef);

    constructor(private subjectRepo: SubjectRepository,
                private classRepo: ClassRepository,
                private classService: ClassService,
                private subjectService: SubjectService) {
        this.teacherForm = new FormGroup<TeacherForm>({
            subjectControl: new FormControl<SubjectDropdown[]>([], Validators.required),
            classControl: new FormControl<ClassDropdown[]>([], Validators.required)
        });
        this.loading$ = this.classRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.loading$ = this.subjectRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    ngOnInit() {
        this.initDropdowns();
        this.teacherFormEvent.emit(this.teacherForm);
    }

    initDropdowns() {
        this.subjectService.listAvailableSubjects().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(subjects =>
            this.subjectDropdowns = subjects.map(subject => ({
                ...subject,
                dropDownValue: `${subject.name} (${subject.classDifficulty}. osztály)`
            }))
        );
    }

    triggerFormBySubject() {
        this.teacherFormEvent.emit(this.teacherForm);
        const classLevels = this.teacherForm.controls.subjectControl.value?.map(
            subject => subject.classDifficulty
        );
        this.classService.listTeacherClasses(classLevels ? classLevels : [])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(classes => {
                this.teacherForm.controls.classControl.setValue([]);
                this.classDropdowns = classes.map(classVal => ({
                    ...classVal,
                    dropDownValue: `${classVal.classLevel}.${classVal.letter}`
                }))
            }
        );
    }

    triggerFormByClass() {
        this.teacherFormEvent.emit(this.teacherForm);
    }

    ngOnDestroy(): void {
        this.teacherFormEvent.emit(undefined);
    }
}

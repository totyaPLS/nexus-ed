import {Component, DestroyRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClassDropdown, UserDropdown, User} from "../../../../../common/util/models/user-models";
import {StudentForm} from "../../../../../common/util/models/user-form-models";
import {ClassService} from "../../../../../common/rest/class.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-student-creation',
    standalone: true,
    imports: [
        DropdownModule,
        ReactiveFormsModule
    ],
    template: `
        <form [formGroup]="studentForm">
            <div class="grid student-creation-box">
                <div class="col-6">
                    <p-dropdown inputId="parent" [options]="parentDropdowns" optionLabel="dropDownValue" [filter]="true"
                                filterBy="dropDownValue" [showClear]="true" placeholder="Szülő"
                                formControlName="parentControl"
                                (onChange)="triggerForm()">
                        <ng-template let-parent pTemplate="item">
                            <div class="flex align-items-center">
                                <div>{{ parent.dropDownValue }}</div>
                            </div>
                        </ng-template>
                    </p-dropdown>
                </div>
                <div class="col-6">
                    <p-dropdown inputId="class" [options]="classDropdowns" optionLabel="dropDownValue" [filter]="true"
                                filterBy="dropDownValue" [showClear]="true" placeholder="Osztály"
                                formControlName="classControl"
                                (onChange)="triggerForm()">
                        <ng-template let-class pTemplate="item">
                            <div class="flex align-items-center">
                                <div>{{ class.dropDownValue }}</div>
                            </div>
                        </ng-template>
                    </p-dropdown>
                </div>
            </div>
        </form>
    `,
    styles: [`
        .student-creation-box {
            min-height: 200px;
        }
    `]
})

export class StudentCreationComponent implements OnInit, OnDestroy {
    @Input() parents!: User[];
    @Output() studentFormEvent = new EventEmitter<FormGroup<StudentForm>>();

    parentDropdowns!: UserDropdown[];
    classDropdowns!: ClassDropdown[];
    studentForm: FormGroup<StudentForm>;

    destroyRef = inject(DestroyRef);

    constructor(private classService: ClassService) {
        this.studentForm = new FormGroup<StudentForm>({
            parentControl: new FormControl<UserDropdown | null>(null, Validators.required),
            classControl: new FormControl<ClassDropdown | null>(null, Validators.required)
        });
    }

    ngOnInit() {
        this.initDropdowns();
        this.studentFormEvent.emit(this.studentForm);
    }

    initDropdowns() {
        this.classService.listClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(classes =>
            this.classDropdowns = classes.map(classVal => ({
                ...classVal,
                dropDownValue: `${classVal.classLevel}.${classVal.letter}`
            }))
        );

        this.parentDropdowns = this.parents.map(parent => ({
            uid: parent.uid,
            firstName: parent.firstName,
            lastName: parent.lastName,
            dropDownValue: `${parent.lastName} ${parent.firstName} (${parent.uid})`
        }));
    }

    triggerForm() {
        this.studentFormEvent.emit(this.studentForm);
    }

    ngOnDestroy(): void {
        this.studentFormEvent.emit(undefined);
    }
}

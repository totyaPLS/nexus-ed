import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ClassDropdown, ParentDropdown, User} from "../../../../../common/util/models/user-models";
import {Class} from "../../../../../common/util/models/class-models";

@Component({
    selector: 'app-student-creation',
    standalone: true,
    imports: [
        DropdownModule,
        ReactiveFormsModule
    ],
    template: `
        <div class="grid student-creation-box">
            <div class="col-6">
                <p-dropdown inputId="parent" [options]="parentDropdowns" optionLabel="dropDownValue" [filter]="true"
                            filterBy="dropDownValue" [showClear]="true" placeholder="Szülő"
                            [formControl]="parentControl"
                            (onChange)="triggerParent()">
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
                            [formControl]="classControl"
                            (onChange)="triggerClass()">
                    <ng-template let-class pTemplate="item">
                        <div class="flex align-items-center">
                            <div>{{ class.dropDownValue }}</div>
                        </div>
                    </ng-template>
                </p-dropdown>
            </div>
        </div>
    `,
    styles: [`
        .student-creation-box {
            min-height: 200px;
        }
    `]
})

export class StudentCreationComponent implements OnInit {
    @Input() parents!: User[];
    @Input() classes!: Class[];
    @Output() parentChangeEvent = new EventEmitter<ParentDropdown>();
    @Output() classChangeEvent = new EventEmitter<ClassDropdown>();

    parentDropdowns!: ParentDropdown[];
    classDropdowns!: ClassDropdown[];
    parentControl!: FormControl<ParentDropdown | null>;
    classControl!: FormControl<ClassDropdown | null>;

    ngOnInit() {
        this.initParentData();
        this.initClassData();
    }

    initParentData() {
        this.parentDropdowns = this.parents.map(parent => ({
            uid: parent.uid,
            firstName: parent.firstName,
            lastName: parent.lastName,
            dropDownValue: `${parent.lastName} ${parent.firstName} (${parent.uid})`
        }));

        this.parentControl = new FormControl<ParentDropdown>({
            uid: '',
            firstName: '',
            lastName: '',
            dropDownValue: ''
        }, Validators.required);
    }

    initClassData() {
        this.classDropdowns = this.classes.map(classVal => ({
            ...classVal,
            dropDownValue: `${classVal.classLevel}.${classVal.letter}`
        }));

        this.classControl = new FormControl<ClassDropdown>({
            id: 0,
            classLevel: 0,
            letter: '',
            dropDownValue: ''
        }, Validators.required);
    }

    triggerParent() {
        this.parentChangeEvent.emit(this.parentControl.getRawValue()!);
    }

    triggerClass() {
        this.classChangeEvent.emit(this.classControl.getRawValue()!);
    }
}

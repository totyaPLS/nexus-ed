import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ParentDropdown, User} from "../../../../../common/util/models/user-models";

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
                            filterBy="dropDownValue" [showClear]="true" placeholder="Szülő" [formControl]="parentInput"
                            (onChange)="triggerParent()">
                    <ng-template let-parent pTemplate="item">
                        <div class="flex align-items-center">
                            <div>{{ parent.dropDownValue }}</div>
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
    @Output() parentChangeEvent = new EventEmitter<ParentDropdown>();
    @Output() formValidityChange = new EventEmitter<boolean>();

    parentDropdowns!: ParentDropdown[];
    parentInput!: FormControl<ParentDropdown | null>;

    ngOnInit() {
        this.parentDropdowns = this.parents.map(parent => ({
            uid: parent.uid,
            firstName: parent.firstName,
            lastName: parent.lastName,
            dropDownValue: `${parent.lastName} ${parent.firstName} (${parent.uid})`
        }));

        this.parentInput = new FormControl<ParentDropdown>({
            uid: '',
            firstName: '',
            lastName: '',
            dropDownValue: ''
        }, Validators.required);

        this.formValidityChange.emit(true);
    }

    triggerParent() {
        this.parentChangeEvent.emit(this.parentInput.getRawValue()!);
        this.formValidityChange.emit(this.parentInput.invalid);
    }
}

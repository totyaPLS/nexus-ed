import {Component, Input} from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {User} from "../../../../../common/state/users.repository";

@Component({
  selector: 'app-student-creation',
  standalone: true,
    imports: [
        DropdownModule
    ],
  template: `
      <div class="student-creation-box">
          <p-dropdown inputId="country" [options]="parents" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true" placeholder="Szülő">
              <ng-template let-parent pTemplate="item">
                  <div class="flex align-items-center">
                      <div>{{parent.lastName}} {{parent.firstName}}</div>
                  </div>
              </ng-template>
          </p-dropdown>
      </div>
  `,
  styles: [`
    .student-creation-box {
        min-height: 300px;
    }
  `]
})
export class StudentCreationComponent {
    @Input() parents!: User[];
}

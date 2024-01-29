import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {NgClass, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-nex-input',
  standalone: true,
    imports: [
        InputTextModule,
        NgIf,
        PaginatorModule,
        ReactiveFormsModule,
        NgClass
    ],
  template: `
      <input type="text" pInputText id="lastname" formControlName="lastName" required
             [ngClass]="{'ng-invalid ng-dirty' : true}"/>
      <small class="ng-dirty ng-invalid" *ngIf="true">A vezetéknév megadása kötelező.</small>
  `,
  styles: ``
})
export class NexInputComponent {

}

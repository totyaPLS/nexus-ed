import {Component} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DatePipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";

@Component({
  selector: 'app-others-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        DatePipe,
        RouterLink,
    ],
  templateUrl: './others-block.component.html',
  styleUrl: './others-block.component.scss'
})
export class OthersBlockComponent {
}

import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Announcement} from "../../../util/models/announcement-models";
import {RouterLink} from "@angular/router";
import {DatePipe} from "@angular/common";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";

@Component({
  selector: 'app-announcement-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        RouterLink,
        DatePipe,
        NexRoleValidationModule
    ],
  templateUrl: './announcement-block.component.html',
  styleUrl: './announcement-block.component.scss'
})
export class AnnouncementBlockComponent {
    @Input() announcements!: Announcement[];
}

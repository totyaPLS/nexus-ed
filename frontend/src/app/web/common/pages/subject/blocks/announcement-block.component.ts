import {Component, Input} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Announcement} from "../../../util/models/announcement-models";

@Component({
  selector: 'app-announcement-block',
  standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule
    ],
  templateUrl: './announcement-block.component.html',
  styleUrl: './announcement-block.component.scss'
})
export class AnnouncementBlockComponent {
    @Input() announcements!: Announcement[];
}

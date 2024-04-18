import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AnnouncementService} from "../../../rest/announcement.service";
import {distinctUntilChanged, Observable} from "rxjs";
import {Announcement} from "../../../util/models/announcement-models";
import {getEnumName, TASK_TYPE} from "../../../util/enums/Subject";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CommentsComponent} from "./comments/comments.component";
import {Comment} from "../../../util/models/comment-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AnnouncementRepository} from "../../../state/announcements.repository";

@Component({
  selector: 'app-announcements',
  standalone: true,
    imports: [
        AccordionModule,
        NgForOf,
        AsyncPipe,
        DatePipe,
        NgIf,
        ButtonModule,
        RippleModule,
        RouterLink,
        CommentsComponent
    ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsComponent implements OnInit {
    protected readonly getEnumName = getEnumName;
    protected readonly TASK_TYPE = TASK_TYPE;

    subjectId!: number;
    classId!: number;
    announcementType!: string;
    announcements$?: Observable<Announcement[]>;
    loading$!: Observable<boolean>;

    destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute,
                private announcementService: AnnouncementService,
                private announcementRepo: AnnouncementRepository) {
    }

    ngOnInit(): void {
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);
        this.announcementType = this.route.snapshot.paramMap.get('announcementType')!;
        this.announcements$ = this.announcementService.listAnnouncementsWithComments(this.subjectId, this.classId, this.announcementType);
        this.loading$ = this.announcementRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    isTaskExpired(deadline: string) {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        return deadlineDate < currentDate;
    }

    addComment(comment: Comment) {
        this.announcementService.addComment(comment).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
}

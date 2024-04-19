import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AnnouncementService} from "../../../rest/announcement.service";
import {distinctUntilChanged, Observable} from "rxjs";
import {Announcement} from "../../../util/models/announcement-models";
import {AnnouncementType, getEnumName, TASK_TYPE} from "../../../util/enums/Subject";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CommentsComponent} from "./comments/comments.component";
import {Comment} from "../../../util/models/comment-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AnnouncementRepository} from "../../../state/announcements.repository";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";

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
        CommentsComponent,
        NexRoleValidationModule
    ],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsComponent implements OnInit {
    protected readonly getEnumName = getEnumName;
    protected readonly TASK_TYPE = TASK_TYPE;
    protected readonly AnnouncementType = AnnouncementType;

    subjectId!: number;
    classId!: number;
    announcementType!: string;
    announcements$?: Observable<Announcement[]>;
    loading$!: Observable<boolean>;

    destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute,
                private router: Router,
                private announcementService: AnnouncementService,
                private announcementRepo: AnnouncementRepository) {
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);
        this.announcementType = this.route.snapshot.paramMap.get('announcementType')!;

        if (this.announcementType === AnnouncementType.ANNOUNCEMENTS) {
            this.announcements$ = this.announcementRepo.announcements$;
        }
        if (this.announcementType === AnnouncementType.TASKS) {
            this.announcements$ = this.announcementRepo.tasks$;
        }
        this.loading$ = this.announcementRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    ngOnInit(): void {
        this.announcementService.listAnnouncementsWithComments(this.subjectId, this.classId, this.announcementType)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

    isTaskExpired(deadline: string) {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date();
        return deadlineDate < currentDate;
    }

    addComment(comment: Comment) {
        this.announcementService.addComment(comment).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    navigateToSubmittedTasks(taskId: number) {
        this.router.navigate([taskId], { relativeTo: this.route });
    }
}

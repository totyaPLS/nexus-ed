import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AccordionModule} from "primeng/accordion";
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AnnouncementService} from "../../../rest/announcement.service";
import {Observable} from "rxjs";
import {Announcement, Task} from "../../../util/models/announcement-models";
import {DETAIL, getEnumName, SubjectDetailType, TASK_TYPE} from "../../../util/enums/Commons";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CommentsComponent} from "./components/comments.component";
import {Comment} from "../../../util/models/comment-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AnnouncementRepository} from "../../../state/announcements.repository";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";
import {DividerModule} from "primeng/divider";
import {NewAnnouncementPopupComponent} from "../components/new-announcement-popup.component";
import {TaskPopupComponent} from "../submitted-tasks/components/task-popup.component";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {TaskSubmitPopupComponent} from "../components/task-submit-popup.component";

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
        NexRoleValidationModule,
        NgClass,
        DividerModule,
        NewAnnouncementPopupComponent,
        TaskPopupComponent,
        NexusTimeModule,
        ConfirmPopupModule,
        TaskSubmitPopupComponent
    ],
    providers: [ConfirmationService],
    templateUrl: './announcements.component.html',
    styleUrl: './announcements.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsComponent implements OnInit {
    protected readonly getEnumName = getEnumName;
    protected readonly TASK_TYPE = TASK_TYPE;
    protected readonly DETAIL = DETAIL;

    announcementDialog = false;
    submitDialog = false;
    openedTask?: Task;

    subjectId: number;
    classId: number;
    announcementType!: string;
    announcements$!: Observable<Announcement[]>;
    loading$: Observable<boolean>;

    destroyRef = inject(DestroyRef);

    constructor(private route: ActivatedRoute,
                private router: Router,
                private announcementService: AnnouncementService,
                private announcementRepo: AnnouncementRepository,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.loading$ = this.announcementRepo.deleteLoading$;
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);
        this.announcementType = this.route.snapshot.paramMap.get('announcementType')!;
        this.announcementRepo.deleteAll();

        if (this.announcementType === SubjectDetailType.ANNOUNCEMENTS) {
            this.announcements$ = this.announcementRepo.announcements$;
        }
        if (this.announcementType === SubjectDetailType.TASKS) {
            this.announcements$ = this.announcementRepo.tasks$;
        }
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

    get isTaskType() {
        return this.announcementType === SubjectDetailType.TASKS;
    }

    confirmDel(announcementId: number, event: Event) {
        this.confirmationService.confirm({
            key: 'confirmDel',
            target: event.target || new EventTarget,
            message: `Biztos szeretnéd törölni ezt a ${this.isTaskType ? 'feladatot' : 'közleményt'}?`,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Igen',
            rejectLabel: 'Nem',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.announcementService.deleteAnnouncement(announcementId)
                    .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sikeres',
                            detail: `Közlemény törölve (ID: ${announcementId})`,
                            life: 3000,
                        });
                        this.announcementService.listAllAnnouncementAfterUpload(this.subjectId, this.classId)
                            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
                    }
                );
            },
            reject: () => {}
        });
    }

    navigateToSubmittedTasks(taskId: number) {
        this.router.navigate([taskId], {relativeTo: this.route});
    }

    openAnnouncementPopup() {
        this.announcementDialog = true;
    }

    closeAnnouncementPopup() {
        this.announcementDialog = false;
    }

    openSubmitPopup(task: Task) {
        this.openedTask = task;
        this.submitDialog = true;
    }

    closeSubmitPopup() {
        this.submitDialog = false;
    }

    get isAnnouncementTask() {
        return this.announcementType === SubjectDetailType.TASKS;
    }
}

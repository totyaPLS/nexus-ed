import {ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Announcement} from "../../../util/models/announcement-models";
import {RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";
import {NewAnnouncementPopupComponent} from "../components/new-announcement-popup.component";
import {SubjectDetailType} from "../../../util/enums/Commons";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ConfirmationService, MessageService} from "primeng/api";
import {AnnouncementService} from "../../../rest/announcement.service";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {Observable} from "rxjs";
import {AnnouncementRepository} from "../../../state/announcements.repository";

@Component({
    selector: 'app-announcement-block',
    standalone: true,
    imports: [
        TableModule,
        ButtonModule,
        RippleModule,
        RouterLink,
        DatePipe,
        NexRoleValidationModule,
        NewAnnouncementPopupComponent,
        NgIf,
        NexusTimeModule,
        ConfirmPopupModule,
        AsyncPipe
    ],
    providers: [ConfirmationService],
    templateUrl: './announcement-block.component.html',
    styleUrl: './announcement-block.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementBlockComponent {
    @Input() announcements!: Announcement[];
    @Input() classId!: number;
    @Input() subjectId!: number;

    announcementType = SubjectDetailType.ANNOUNCEMENTS;
    isDialogDisplayed = false;

    loading$: Observable<boolean>;

    destroyRef = inject(DestroyRef);

    constructor(private confirmationService: ConfirmationService,
                private announcementService: AnnouncementService,
                private messageService: MessageService,
                private announcementRepo: AnnouncementRepository) {
        this.loading$ = this.announcementRepo.deleteLoading$;
    }

    openNew() {
        this.isDialogDisplayed = true;
    }

    closeDialog() {
        this.isDialogDisplayed = false;
    }

    confirmDel(announcementId: number, event: Event) {
        this.confirmationService.confirm({
            key: 'confirmDel',
            target: event.target || new EventTarget,
            message: 'Biztos szeretnéd törölni ezt a közleményt?',
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
}

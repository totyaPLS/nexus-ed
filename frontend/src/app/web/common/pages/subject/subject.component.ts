import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {combineLatestWith, distinctUntilChanged, map, Observable, Subscription, take} from "rxjs";
import {Announcement} from "../../util/models/announcement-models";
import {Absence} from "../../util/models/absence-models";
import {AnnouncementRepository} from "../../state/announcements.repository";
import {AbsenceRepository} from "../../state/absences.repository";
import {AnnouncementService} from "../../rest/announcement.service";
import {AbsenceService} from "../../rest/absence.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {AsyncPipe, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {NexLoadingModule} from "../../../../config/loading/nex-loading.module";
import {AnnouncementBlockComponent} from "./blocks/announcement-block.component";
import {TaskBlockComponent} from "./blocks/task-block.component";
import {AbsenceBlockComponent} from "./blocks/absence-block.component";
import {NewAnnouncementPopupComponent} from "./components/new-announcement-popup.component";
import {OthersBlockComponent} from "./blocks/others-block.component";
import {NexRoleValidationModule} from "../../../../config/auth/nex-role-validation.module";

@Component({
  selector: 'app-subject',
  standalone: true,
    imports: [
        TableModule,
        DropdownModule,
        AsyncPipe,
        ButtonModule,
        RippleModule,
        NexLoadingModule,
        AnnouncementBlockComponent,
        TaskBlockComponent,
        AbsenceBlockComponent,
        NewAnnouncementPopupComponent,
        NgIf,
        OthersBlockComponent,
        NexRoleValidationModule
    ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectComponent implements OnInit, OnDestroy {
    subjectId!: number;
    classId!: number;
    announcements$: Observable<Announcement[]>;
    tasks$: Observable<Announcement[]>;
    absences$: Observable<Absence[]>;
    loading$: Observable<boolean>;
    routeSubscription!: Subscription;

    destroyRef = inject(DestroyRef);

    constructor(private announcementRepo: AnnouncementRepository,
                private absenceRepo: AbsenceRepository,
                private announcementService: AnnouncementService,
                private absenceService: AbsenceService,
                private route: ActivatedRoute) {
        this.announcements$ = this.announcementRepo.announcements$.pipe(map(tasks => tasks.slice(0, 5)));
        this.tasks$ = this.announcementRepo.tasks$.pipe(map(tasks => tasks.slice(0, 6)));
        this.absences$ = this.absenceRepo.absences$;
        this.loading$ = this.announcementRepo.listLoading$.pipe(
            combineLatestWith(
                this.absenceRepo.listLoading$
            ),
            map(loadingValues => loadingValues.some(v => v)),
            distinctUntilChanged()
        );
    }

    ngOnInit(): void {
        this.routeSubscription = this.route.params.subscribe((params: Params) => {
            this.subjectId = parseInt(this.route.snapshot.paramMap.get('subjectId')!);
            this.classId = parseInt(this.route.snapshot.paramMap.get('classId')!);

            this.announcementService.listAllAnnouncement(this.subjectId, this.classId)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();

            this.absenceService.listBlockAbsences(this.subjectId, this.classId)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe();
        });
    }

    ngOnDestroy(): void {
        this.routeSubscription.unsubscribe();
    }

}

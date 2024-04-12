import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {combineLatestWith, distinctUntilChanged, map, Observable} from "rxjs";
import {Announcement} from "../../util/models/announcement-models";
import {Task} from "../../util/models/task-models";
import {Absence} from "../../util/models/absence-models";
import {AnnouncementRepository} from "../../state/announcements.repository";
import {TaskRepository} from "../../state/tasks.repository";
import {AbsenceRepository} from "../../state/absences.repository";
import {AnnouncementService} from "../../rest/announcement.service";
import {TaskService} from "../../rest/task.service";
import {AbsenceService} from "../../rest/absence.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent implements OnInit {
    subjectId: number;
    classId: number;
    announcements$!: Observable<Announcement[]>;
    tasks$!: Observable<Task[]>;
    absences$!: Observable<Absence[]>;
    loading$: Observable<boolean>;

    destroyRef = inject(DestroyRef);

    constructor(private activatedRoute: ActivatedRoute,
                private announcementRepo: AnnouncementRepository,
                private taskRepo: TaskRepository,
                private absenceRepo: AbsenceRepository,
                private announcementService: AnnouncementService,
                private taskService: TaskService,
                private absenceService: AbsenceService) {
        this.subjectId = parseInt(this.activatedRoute.snapshot.paramMap.get('subjectId')!);
        this.classId = parseInt(this.activatedRoute.snapshot.paramMap.get('classId')!);
        this.announcements$ = this.announcementRepo.announcements$;
        this.tasks$ = this.taskRepo.tasks$;
        this.absences$ = this.absenceRepo.absences$;
        this.loading$ = this.announcementRepo.listLoading$.pipe(
            combineLatestWith(
                this.taskRepo.listLoading$,
                this.absenceRepo.listLoading$
            ),
            map(loadingValues => loadingValues.some(v => v)),
            distinctUntilChanged()
        );
    }

    ngOnInit(): void {
        this.announcementService.listTeacherAnnouncements(this.subjectId, this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

        this.taskService.listTeacherTasks(this.subjectId, this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();

        this.absenceService.listTeacherAbsences(this.subjectId, this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe();
    }

}

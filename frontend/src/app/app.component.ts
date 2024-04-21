import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {combineLatestWith, distinctUntilChanged, map, Observable} from "rxjs";
import {AnnouncementRepository} from "./web/common/state/announcements.repository";
import {SubjectMenuRepository} from "./web/common/state/subject-menus.repository";
import {SubjectRepository} from "./web/common/state/subjects.repository";
import {CommentRepository} from "./web/common/state/comments.repository";
import {SubmittableTasksRepository} from "./web/common/state/submittable-tasks.repository";
import {AbsenceRepository} from "./web/common/state/absences.repository";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    loading$: Observable<boolean>;

    constructor(private primengConfig: PrimeNGConfig,
                private announcementRepo: AnnouncementRepository,
                private subjectMenuRepo: SubjectMenuRepository,
                private subjectRepo: SubjectRepository,
                private commentRepo: CommentRepository,
                private submittableTasksRepo: SubmittableTasksRepository,
                private absencesRepo: AbsenceRepository) {
        this.loading$ = this.announcementRepo.listLoading$.pipe(
            combineLatestWith(
                this.announcementRepo.checkLoading$,
                this.subjectMenuRepo.listLoading$,
                this.subjectRepo.listLoading$,
                this.commentRepo.listLoading$,
                this.submittableTasksRepo.listLoading$,
                this.absencesRepo.listLoading$,
            ),
            map(loadingValues => loadingValues.some(v => v)),
            distinctUntilChanged()
        );
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
    }
}

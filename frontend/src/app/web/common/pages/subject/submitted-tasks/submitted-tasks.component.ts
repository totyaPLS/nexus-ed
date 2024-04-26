import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {UserPopupComponent} from "../../../../admin/components/users/user-popup/user-popup.component";
import {distinctUntilChanged, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SubmittableTask} from "../../../util/models/announcement-models";
import {SubmittableTasksRepository} from "../../../state/submittable-tasks.repository";
import {SubmittableTaskService} from "../../../rest/submittable-task.service";
import {ActivatedRoute} from "@angular/router";
import {TaskPopupComponent} from "./components/task-popup.component";
import {BoolIndicatorComponent} from "../../../components/bool-indicator.component";
import {GradeClassDirective} from "../../../components/grade.directive";
import {NexLoadingModule} from "../../../../../config/loading/nex-loading.module";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";

@Component({
  selector: 'app-submitted-tasks',
  standalone: true,
    imports: [
        AsyncPipe,
        ButtonModule,
        InputTextModule,
        NgIf,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        UserPopupComponent,
        DatePipe,
        TaskPopupComponent,
        BoolIndicatorComponent,
        GradeClassDirective,
        NexLoadingModule,
        NexusTimeModule
    ],
  templateUrl: './submitted-tasks.component.html',
  styleUrl: './submitted-tasks.component.scss'
})
export class SubmittedTasksComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    detailsDialog = false;

    loading$: Observable<boolean>;
    tasks$!: Observable<SubmittableTask[]>;
    first = 0;
    rows = 10;
    announcementId: number;

    destroyRef = inject(DestroyRef);

    constructor(private taskService: SubmittableTaskService,
                private taskRepo: SubmittableTasksRepository,
                private route: ActivatedRoute) {
        this.tasks$ = taskRepo.tasks$;
        this.loading$ = this.taskRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.announcementId = parseInt(this.route.snapshot.paramMap.get('announcementId')!);
    }

    ngOnInit(): void {
        this.taskService.listTasks(this.announcementId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    next() {
        this.first = this.first + this.rows;
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    openNew() {
        this.detailsDialog = true;
    }

    closeDialog() {
        this.detailsDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}

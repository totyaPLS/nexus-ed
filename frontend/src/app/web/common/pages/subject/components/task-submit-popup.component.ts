import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {EditorModule} from "primeng/editor";
import {MessageService} from "primeng/api";
import {distinctUntilChanged, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {SubmittableTasksRepository} from "../../../state/submittable-tasks.repository";
import {SubmittableTaskService} from "../../../rest/submittable-task.service";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SubmittableTask, Task} from "../../../util/models/announcement-models";
import {GradeClassDirective} from "../../../components/grade.directive";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";

@Component({
    selector: 'app-task-submit-popup',
    standalone: true,
    imports: [
        DialogModule,
        FormsModule,
        InputTextModule,
        NgIf,
        ReactiveFormsModule,
        CommonModule,
        EditorModule,
        ButtonModule,
        RippleModule,
        GradeClassDirective,
        NexusTimeModule,
    ],
    templateUrl: './task-submit-popup.component.html',
    styles: [`
      .task-box {
          min-height: 200px;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskSubmitPopupComponent implements OnInit {
    @Input() submitDialog!: boolean;
    @Input() task!: Task;
    @Output() closeDialogEvent = new EventEmitter<void>();

    subjectId: number;
    classId: number;
    textControl: FormControl<string | null>;

    submittableTask!: SubmittableTask;
    destroyRef = inject(DestroyRef);
    loading$: Observable<boolean>;

    constructor(private submittableTaskService: SubmittableTaskService,
                private submittableTasksRepo: SubmittableTasksRepository,
                private route: ActivatedRoute,
                private messageService: MessageService) {
        this.loading$ = this.submittableTasksRepo.upLoading$.pipe(
            distinctUntilChanged(),
        );
        this.subjectId = JSON.parse(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = JSON.parse(this.route.snapshot.paramMap.get('classId')!);
        this.textControl = new FormControl('', Validators.required);
    }

    ngOnInit(): void {
        this.submittableTaskService.getSubmittableTask(this.task.announcementId)
            .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(submittableTask => {
            this.submittableTask = submittableTask;
        });
    }

    hideDialog() {
        this.closeDialogEvent.emit();
    }

    get isFormInvalid() {
        return this.textControl.invalid || this.textControl.untouched;
    }

    saveAnnouncement() {
        this.submittableTask.text = this.textControl.getRawValue()!;
        this.submittableTaskService.submitTask(this.submittableTask)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Sikeres',
                    detail: 'Feladat beadva',
                    life: 3000,
                });
                this.hideDialog();
            });
    }

    onEditorChange() {
        this.textControl.updateValueAndValidity();
    }

    get canSubmit() {
        return !this.submittableTask.grade && !this.submittableTask.submitted && !this.isTaskExpired;
    }

    get isTaskExpired() {
        const deadlineDate = new Date(this.task.deadline);
        const currentDate = new Date();
        return deadlineDate < currentDate;
    }
}

import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {BoolIndicatorComponent} from "../../../components/bool-indicator.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, MessageService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {TaskPopupComponent} from "../submitted-tasks/components/task-popup.component";
import {ToastModule} from "primeng/toast";
import {distinctUntilChanged, map, Observable} from "rxjs";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NewAbsencePopupComponent} from "../components/new-absence-popup.component";
import {NexLoadingModule} from "../../../../../config/loading/nex-loading.module";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {DiaryRepository} from "../../../state/diaries.repository";
import {Diary} from "../../../util/models/diary-models";
import {LessonService} from "../../../rest/lesson.service";
import {FormControl, FormGroup, FormsModule, isFormControl, ReactiveFormsModule} from "@angular/forms";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";

@Component({
    selector: 'app-diaries',
    standalone: true,
    imports: [
        AsyncPipe,
        BoolIndicatorComponent,
        ButtonModule,
        DatePipe,
        InputTextModule,
        NgIf,
        RippleModule,
        SharedModule,
        TableModule,
        TaskPopupComponent,
        ToastModule,
        NewAbsencePopupComponent,
        NexLoadingModule,
        ConfirmPopupModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        NexusTimeModule
    ],
    providers: [ConfirmationService],
    templateUrl: './diaries.component.html',
    styleUrl: './diaries.component.scss'
})
export class DiariesComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    isDialogDisplayed = false;

    loading$: Observable<boolean>;
    diaries$!: Observable<Diary[]>;
    first = 0;
    rows = 10;
    subjectId: number;
    classId: number;

    destroyRef = inject(DestroyRef);
    tableGroup: FormGroup;

    constructor(private lessonService: LessonService,
                private diaryRepo: DiaryRepository,
                private route: ActivatedRoute,
                private messageService: MessageService) {
        this.diaries$ = diaryRepo.diaries$;
        this.loading$ = this.diaryRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.diaryRepo.deleteAll();
        this.subjectId = parseInt(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = parseInt(this.route.snapshot.paramMap.get('classId')!);
        this.tableGroup = new FormGroup({});
    }

    ngOnInit(): void {
        this.lessonService.listDiaries(this.subjectId, this.classId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(diaries => {
                const formGroupConfig: any = {};
                for (const diary of diaries) {
                    formGroupConfig[diary.lessonId] = new FormControl(diary.topic);
                }
                this.tableGroup = new FormGroup(formGroupConfig);
            });
    }

    get notLoggedNum() {
        return this.diaries$.pipe(
            map(diaries => diaries.filter(diary => !diary.topic).length)
        );
    }

    uploadTopic(diary: Diary) {
        const topic = this.tableGroup.get((diary.lessonId).toString())?.getRawValue();
        if (topic !== '') {
            this.lessonService.uploadTopic(diary.lessonId, topic)
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sikeres tanóra naplózás',
                        detail: 'Óra téma feltöltve',
                        life: 3000,
                    });
                });
            this.changeElToText(diary);
        }
    }

    isFormControlInvalid(diary: Diary) {
        const formValue = this.tableGroup.get((diary.lessonId).toString())?.getRawValue();
        return  (!formValue || formValue === '');
    }

    changeElToInput(diary: Diary) {
        diary.editNeeded = true;
        this.tableGroup.get((diary.lessonId.toString()))?.setValue(diary.topic);
    }

    changeElToText(diary: Diary) {
        diary.editNeeded = false;
    }

    next() {
        this.first = this.first + this.rows;
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    openNew() {
        this.isDialogDisplayed = true;
    }

    closeDialog() {
        this.isDialogDisplayed = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
}

import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {InputTextModule} from "primeng/inputtext";
import {NewAbsencePopupComponent} from "../components/new-absence-popup.component";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {distinctUntilChanged, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {GradeData, YearGradesForStudent} from "../../../util/models/grade-models";
import {GradeService} from "../../../rest/grade.service";
import {GradeRepository} from "../../../state/grades.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NexLoadingModule} from "../../../../../config/loading/nex-loading.module";
import {GradeClassDirective} from "../../../components/grade.directive";
import {NewGradePopupComponent} from "./components/new-grade-popup.component";

@Component({
  selector: 'app-grades',
  standalone: true,
    imports: [
        AsyncPipe,
        ButtonModule,
        ConfirmPopupModule,
        DatePipe,
        InputTextModule,
        NewAbsencePopupComponent,
        NgIf,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        NgForOf,
        NexLoadingModule,
        GradeClassDirective,
        NewGradePopupComponent
    ],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    isDialogDisplayed = false;

    loading$: Observable<boolean>;
    grades$!: Observable<YearGradesForStudent[]>;
    first = 0;
    rows = 10;
    subjectId: number;
    classId: number;

    destroyRef = inject(DestroyRef);

    constructor(private gradeService: GradeService,
                private gradeRepo: GradeRepository,
                private route: ActivatedRoute) {
        this.grades$ = gradeRepo.grades$;
        this.loading$ = this.gradeRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.gradeRepo.deleteAll();
        this.subjectId = parseInt(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = parseInt(this.route.snapshot.paramMap.get('classId')!);
    }

    ngOnInit(): void {
        this.gradeService.listClassGrades(this.subjectId, this.classId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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

    getRemindColumn(array: any[]) {
        const differ = 10 - array.length;
        return differ <= 0 ? [] : new Array(differ);
    }

    getAvg(monthGrades: GradeData[][]) {
        let sumOfGrades = 0;
        let sumOfWeights = 0;

        monthGrades.forEach((row: GradeData[]) => {
            row.forEach((gradeData: GradeData) => {
                sumOfGrades += gradeData.grade * gradeData.weight;
                sumOfWeights += gradeData.weight;
            });
        });

        if (sumOfWeights === 0) {
            return 0;
        }

        const weightedAverage = sumOfGrades / sumOfWeights;
        return +weightedAverage.toFixed(2);
    }
}

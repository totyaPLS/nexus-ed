import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, DatePipe, NgIf, NgTemplateOutlet} from "@angular/common";
import {BoolIndicatorComponent} from "../../../components/bool-indicator.component";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ConfirmationService, SharedModule} from "primeng/api";
import {Table, TableModule} from "primeng/table";
import {TaskPopupComponent} from "../submitted-tasks/components/task-popup.component";
import {ToastModule} from "primeng/toast";
import {distinctUntilChanged, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Absence} from "../../../util/models/absence-models";
import {AbsenceRepository} from "../../../state/absences.repository";
import {AbsenceService} from "../../../rest/absence.service";
import {ABSENCE_STATUS, getEnumName} from "../../../util/enums/Commons";
import {NewAbsencePopupComponent} from "../components/new-absence-popup.component";
import {NexLoadingModule} from "../../../../../config/loading/nex-loading.module";
import {ConfirmPopup, ConfirmPopupModule} from "primeng/confirmpopup";
import {NexusTimeModule} from "../../../util/date/nexus-time.module";
import {NexRoleValidationModule} from "../../../../../config/auth/nex-role-validation.module";

@Component({
  selector: 'app-absences',
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
        NexusTimeModule,
        NexRoleValidationModule,
        NgTemplateOutlet
    ],
    providers: [ConfirmationService],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.scss'
})
export class AbsencesComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    @ViewChild('actionButtons') actionButtons!: ElementRef;
    @ViewChild('delPopup') delPopup!: ConfirmPopup;

    protected readonly ABSENCE_STATUS = ABSENCE_STATUS;
    protected readonly getEnumName = getEnumName;
    isDialogDisplayed = false;

    loading$: Observable<boolean>;
    absences$!: Observable<Absence[]>;
    first = 0;
    rows = 10;
    subjectId: number;
    classId: number;
    editableAbsence?: Absence;

    destroyRef = inject(DestroyRef);

    constructor(private absenceService: AbsenceService,
                private absenceRepo: AbsenceRepository,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService) {
        this.absences$ = absenceRepo.absences$;
        this.loading$ = this.absenceRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.absenceRepo.deleteAll();
        this.subjectId = parseInt(this.route.snapshot.paramMap.get('subjectId')!);
        this.classId = parseInt(this.route.snapshot.paramMap.get('classId')!);
    }

    ngOnInit(): void {
        this.absenceService.listAllAbsences(this.subjectId, this.classId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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
        if (this.editableAbsence) {
            this.editableAbsence = undefined;
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    confirmDel(absenceId: number, event: Event) {
        this.confirmationService.confirm({
            key: 'confirmDel',
            target: event.target || new EventTarget,
            message: 'Biztos szeretnéd törölni ezt a hiányzást?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Igen',
            rejectLabel: 'Nem',
            acceptButtonStyleClass: 'p-button-danger',
            accept: () => {
                this.absenceService.deleteAbsence(absenceId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
            },
            reject: () => {}
        });
    }

    editAbsence(absence: Absence) {
        this.editableAbsence = absence;
        this.openNew();
    }
}

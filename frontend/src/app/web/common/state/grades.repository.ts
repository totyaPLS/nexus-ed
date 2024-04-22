import {createStore} from "@ngneat/elf";
import {
    deleteAllEntities,
    deleteEntities,
    getAllEntities,
    selectAllEntities,
    setEntities,
    withEntities
} from "@ngneat/elf-entities";
import {Injectable} from "@angular/core";
import {catchError, distinctUntilChanged, EMPTY, Observable, pipe, tap} from "rxjs";
import {
    createRequestsStatusOperator,
    selectIsRequestPending,
    updateRequestStatus,
    withRequestsStatus
} from "@ngneat/elf-requests";
import {YearGradesForStudent} from "../util/models/grade-models";

type RequestStates = 'grades';

@Injectable({providedIn: 'root'})
export class GradeRepository {
    grades$: Observable<YearGradesForStudent[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'grades'},
            withEntities<YearGradesForStudent, 'studentId'>({idKey: 'studentId'}),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.grades$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('grades'),
        );
    }

    getGrades() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setGrades(grades: YearGradesForStudent[]) {
        this.store.update(
            setEntities(grades),
            updateRequestStatus('grades', 'success'),
        );
    }

    deleteGrade(id: string) {
        this.store.update(
            deleteEntities(id),
            updateRequestStatus('grades', 'success'),
        );
    }

    deleteAll() {
        this.store.update(
            deleteAllEntities(),
        );
    }

    private isRequestPending = (key: RequestStates) => pipe(
        selectIsRequestPending(key),
        distinctUntilChanged(),
    );

    withRequestStatus = <T>(key: RequestStates, onSuccess?: (result: T) => void) => pipe(
        this.trackRequestStatus<T>(key),
        tap(result => onSuccess ? onSuccess(result) : null),
        tap(() => this.finalizeRequest(key, 'success')),
        catchError(err => this.finalizeRequest(key, 'error', err)),
    );

    private finalizeRequest(req: RequestStates, status: 'success' | 'error', err?: any): Observable<never> {
        if (status === 'error') {
            this.store.update(
                updateRequestStatus(req, status, err),
            );
        } else {
            this.store.update(
                updateRequestStatus(req, status),
            );
        }
        return EMPTY;
    }
}

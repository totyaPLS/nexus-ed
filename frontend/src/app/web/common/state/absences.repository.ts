import {createStore} from "@ngneat/elf";
import {getAllEntities, selectAllEntities, setEntities, upsertEntities, withEntities} from "@ngneat/elf-entities";
import {Injectable} from "@angular/core";
import {catchError, distinctUntilChanged, EMPTY, Observable, pipe, tap} from "rxjs";
import {
    createRequestsStatusOperator,
    selectIsRequestPending,
    updateRequestStatus,
    withRequestsStatus
} from "@ngneat/elf-requests";
import {Absence} from "../util/models/absence-models";

type RequestStates = 'absences';

@Injectable({providedIn: 'root'})
export class AbsenceRepository {
    absences$: Observable<Absence[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'absences'},
            withEntities<Absence>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.absences$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('absences'),
        );
    }

    getAbsences() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setAbsences(absences: Absence[]) {
        this.store.update(
            setEntities(absences),
            updateRequestStatus('absences', 'success'),
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

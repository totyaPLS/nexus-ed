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
import {SubmittableTask} from "../util/models/announcement-models";

type RequestStates = 'tasks';

@Injectable({providedIn: 'root'})
export class SubmittableTasksRepository {
    tasks$: Observable<SubmittableTask[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'tasks'},
            withEntities<SubmittableTask>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.tasks$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('tasks'),
        );
    }

    getSubmittableTasks() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setSubmittableTasks(tasks: SubmittableTask[]) {
        this.store.update(
            setEntities(tasks),
            updateRequestStatus('tasks', 'success'),
        );
    }

    upsertSubmittableTasks(announcement: SubmittableTask) {
        this.store.update(
            upsertEntities(announcement),
            updateRequestStatus('tasks', 'success'),
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

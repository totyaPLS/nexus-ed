import {createStore} from "@ngneat/elf";
import {
    getAllEntities,
    selectAllEntities, upsertEntities,
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
import {Lesson} from "../util/models/timetable-models";

type RequestStates = 'lessons';

@Injectable({providedIn: 'root'})
export class LessonsRepository {
    lessons$: Observable<Lesson[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'lessons'},
            withEntities<Lesson>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.lessons$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('lessons'),
        );
    }

    getLessons() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setLessons(lessons: Lesson[]) {
        this.store.update(
            upsertEntities(lessons),
            updateRequestStatus('lessons', 'success'),
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

    private getStrLocalDate(lesson: any) {
        const date = new Date(lesson[0], lesson[1] - 1, lesson[2], lesson[3], lesson[4]);
        return date.toISOString();
    }
}

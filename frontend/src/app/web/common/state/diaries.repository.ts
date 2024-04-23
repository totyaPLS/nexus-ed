import {createStore} from "@ngneat/elf";
import {
    deleteAllEntities,
    deleteEntities,
    getAllEntities,
    selectAllEntities,
    setEntities, updateEntities,
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
import {Diary} from "../util/models/diary-models";

type RequestStates = 'diaries';

@Injectable({providedIn: 'root'})
export class DiaryRepository {
    diaries$: Observable<Diary[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'diaries'},
            withEntities<Diary, 'lessonId'>({idKey: 'lessonId'}),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.diaries$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('diaries'),
        );
    }

    getDiaries() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setDiaries(diaries: Diary[]) {
        const updatedDiaries = diaries.map((diary, index) => ({
            ...diary,
            lessonNum: index + 1,
            editNeeded: !diary.topic
        }));

        this.store.update(
            setEntities(updatedDiaries),
            updateRequestStatus('diaries', 'success'),
        );
    }

    updateDiary(diary: Diary) {
        this.store.update(
            updateEntities(diary.lessonId, {topic: diary.topic}),
            updateRequestStatus('diaries', 'success'),
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

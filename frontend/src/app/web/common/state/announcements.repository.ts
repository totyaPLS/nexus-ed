import {createStore} from "@ngneat/elf";
import {
    deleteAllEntities,
    getAllEntities,
    selectManyByPredicate,
    setEntities,
    upsertEntities,
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
import {Announcement} from "../util/models/announcement-models";

type RequestStates = 'announcements' | 'check' | 'upload';

@Injectable({providedIn: 'root'})
export class AnnouncementRepository {
    announcements$: Observable<Announcement[]>;
    tasks$: Observable<Announcement[]>;

    //loading states
    listLoading$: Observable<boolean>;
    checkLoading$: Observable<boolean>;
    upLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'announcements'},
            withEntities<Announcement>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.announcements$ = this.store.pipe(
            selectManyByPredicate(announcement => announcement.task === null)
        );
        this.tasks$ = this.store.pipe(
            selectManyByPredicate(announcement => announcement.task !== null)
        );
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('announcements'),
        );
        this.checkLoading$ = this.store.pipe(
            this.isRequestPending('check'),
        );
        this.upLoading$ = this.store.pipe(
            this.isRequestPending('upload'),
        );
    }

    getAnnouncements() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setAnnouncements(announcements: Announcement[]) {
        this.store.update(
            setEntities(announcements),
            updateRequestStatus('announcements', 'success'),
        );
    }

    upsertAnnouncements(announcement: Announcement) {
        this.store.update(
            upsertEntities(announcement),
            updateRequestStatus('announcements', 'success'),
            updateRequestStatus('upload', 'success'),
        );
    }

    deleteAll() {
        this.store.update(deleteAllEntities());
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

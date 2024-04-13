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

import {SubjectMenuItem} from "../util/models/menu-models";

type RequestStates = 'menuItems';

@Injectable({providedIn: 'root'})
export class SubjectMenuRepository {
    menuItems: Observable<SubjectMenuItem[]>;

    //loading states
    listLoading$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'menuItems'},
            withEntities<SubjectMenuItem>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.menuItems = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('menuItems'),
        );
    }

    getClasses() {
        return this.store.query(
            getAllEntities(),
        );
    }

    setMenuItems(menuItems: SubjectMenuItem[]) {
        menuItems.forEach(item => item.id = item.subject.id);
        this.store.update(
            upsertEntities(menuItems),
            updateRequestStatus('menuItems', 'success'),
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

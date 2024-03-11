import {createStore} from "@ngneat/elf";
import {
    addEntities, deleteEntities,
    getAllEntities,
    selectAllEntities,
    upsertEntities,
    withEntities
} from "@ngneat/elf-entities";
import {Injectable} from "@angular/core";
import {catchError, distinctUntilChanged, EMPTY, Observable, pipe, tap} from "rxjs";
import {
    createRequestsStatusOperator, selectIsRequestPending, updateRequestStatus,
    withRequestsStatus
} from "@ngneat/elf-requests";

export interface User {
    uid: string;
    firstName: string;
    lastName: string;
    // phone: string;
    // publicEmail: string;
    // schoolEmail: string;
    // school: string;
    // residence: string;
    // birthplace: string;
    // birthdate: boolean;
    role: string;
    // online: boolean;
    password: string;
    token: string;
}

export interface Credentials {
    uid: string;
    password: string;
}

type RequestStates =
    'users'
    | 'userLoading'
    | 'userUpdate'
    | 'userDelete';

@Injectable({providedIn: 'root'})
export class UserRepository {
    users$: Observable<User[]>;

    //loading states
    listLoading$: Observable<boolean>;
    userLoading$: Observable<boolean>;
    userUpdating$: Observable<boolean>;
    userDeleting$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'users'},
            withEntities<User, 'uid'>({idKey: 'uid'}),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.users$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('users'),
        );
        this.userLoading$ = this.store.pipe(
            this.isRequestPending('userLoading'),
        );
        this.userUpdating$ = this.store.pipe(
            this.isRequestPending('userUpdate'),
        );
        this.userDeleting$ = this.store.pipe(
            this.isRequestPending('userDelete'),
        );
    }

    getCurrentUsers() {
        return this.store.query(
            getAllEntities(),
        );
    }

    addUser(user: User) {
        this.store.update(
            addEntities(user, {prepend: true}),
        );
    }

    setUser(user: User) {
        this.store.update(
            upsertEntities(user, {prepend: true}),
        );
    }

    setUsers(users: User[]) {
        this.store.update(
            upsertEntities(users),
            updateRequestStatus('userLoading', 'success'),
        );
    }

    deleteUser(uid: User['uid']) {
        this.store.update(
            deleteEntities(uid),
            updateRequestStatus('userLoading', 'success'),
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

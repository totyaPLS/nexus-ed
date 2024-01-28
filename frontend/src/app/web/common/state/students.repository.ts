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

export interface Student {
    id: number;
    surname: string;
    lastname: string;
}

type RequestStates =
    'students'
    | 'studentLoading'
    | 'studentUpdate'
    | 'studentDelete';

@Injectable({providedIn: 'root'})
export class StudentRepository {
    students$: Observable<Student[]>;

    //loading states
    listLoading$: Observable<boolean>;
    studentLoading$: Observable<boolean>;
    studentUpdating$: Observable<boolean>;
    studentDeleting$: Observable<boolean>;

    private readonly store;
    private readonly trackRequestStatus;

    constructor() {
        this.store = createStore({name: 'students'},
            withEntities<Student>(),
            withRequestsStatus<RequestStates>(),
        );
        this.trackRequestStatus = createRequestsStatusOperator(this.store);
        this.students$ = this.store.pipe(selectAllEntities());
        this.listLoading$ = this.store.pipe(
            this.isRequestPending('students'),
        );
        this.studentLoading$ = this.store.pipe(
            this.isRequestPending('studentLoading'),
        );
        this.studentUpdating$ = this.store.pipe(
            this.isRequestPending('studentUpdate'),
        );
        this.studentDeleting$ = this.store.pipe(
            this.isRequestPending('studentDelete'),
        );
    }

    getCurrentStudents() {
        return this.store.query(
            getAllEntities(),
        );
    }

    addStudent(student: Student) {
        this.store.update(
            addEntities(student, {prepend: true}),
        );
    }

    setStudent(student: Student) {
        this.store.update(
            upsertEntities(student, {prepend: true}),
        );
    }

    setStudents(students: Student[]) {
        this.store.update(
            upsertEntities(students),
            updateRequestStatus('studentLoading', 'success'),
        );
    }

    deleteStudent(id: Student['id']) {
        this.store.update(
            deleteEntities(id),
            updateRequestStatus('studentLoading', 'success'),
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

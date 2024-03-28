import {Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UserService} from "../../../common/rest/user.service";
import {UserRepository} from "../../../common/state/users.repository";
import {distinctUntilChanged, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Table} from "primeng/table";
import {SignUpData, User} from "../../../common/util/models/user-models";
import {ClassService} from "../../../common/rest/class.service";
import {Class} from "../../../common/util/models/class-models";
import {ClassRepository} from "../../../common/state/classes.repository";

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    userDialog = false;

    loading$: Observable<boolean>;
    users$!: Observable<User[]>;
    classes$!:  Observable<Class[]>;
    first = 0;
    rows = 10;

    destroyRef = inject(DestroyRef);

    constructor(private userService: UserService,
                private classService: ClassService,
                private userRepo: UserRepository,
                private classRepo: ClassRepository,
                private messageService: MessageService) {
        this.users$ = userRepo.users$;
        this.classes$ = classRepo.classes$;
        this.loading$ = this.userRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
        this.loading$ = this.classRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    ngOnInit(): void {
        this.userService.listUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        if (this.users$) {
            this.users$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(students => {
                return this.first === students.length - this.rows;
            });
        }
        return true;
    }

    isFirstPage(): boolean {
        return this.users$ ? this.first === 0 : true;
    }

    openNew() {
        this.classService.listClasses().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({
            complete: () => {
                this.userDialog = true;
            }
        }));
    }

    closeDialog() {
        this.userDialog = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    deleteUser(uid: string) {
        this.userService.deleteUser(uid)
            .subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Felhasználó törölve', life: 3000 });
            });
    }

    saveUser(signUpData: SignUpData) {
        /*this.userService.createUser(signUpData)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Felhasználó hozzáadva', life: 3000 });
                this.closeDialog();
            });*/
        console.log(signUpData);
    }

    get parents$() {
        return this.userRepo.getParents();
    }
}

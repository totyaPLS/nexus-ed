import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {UserService} from "../../../common/rest/user.service";
import {User, UserRepository} from "../../../common/state/users.repository";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    templateUrl: './users.component.html',
    providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {
    userDialog = false;

    users$!: Observable<User[]>;
    first = 0;
    rows = 10;

    destroyRef = inject(DestroyRef);

    constructor(private studentService: UserService,
                private studentRepo: UserRepository,
                private messageService: MessageService) {
        this.users$ = studentRepo.users$;
    }

    ngOnInit(): void {
        this.studentService.listUsers().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
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
        this.userDialog = true;
    }

    closeDialog() {
        this.userDialog = false;
    }

    deleteProduct(uid: string) {
        this.studentService.deleteUser(uid)
            .subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Sikeres', detail: 'Felhasználó törölve', life: 3000 });
            });
    }
}

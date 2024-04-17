import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {distinctUntilChanged, Observable} from "rxjs";
import {User} from "../../util/models/user-models";
import {UserService} from "../../rest/user.service";
import {UserRepository} from "../../state/users.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    loading$: Observable<boolean>;
    user$: Observable<User | undefined>;

    destroyRef = inject(DestroyRef);
    panel: string = 'default';

    constructor(private userService: UserService,
                private userRepo: UserRepository) {
        this.user$ = this.userRepo.getFirstUser();
        this.loading$ = this.userRepo.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }



    ngOnInit(): void {
        this.userService.getLoggedInUserData().pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(user => console.log(user));
    }

    editProfile(uid: string): void {
        console.log('edit profile');
    }

    revealInfo(uid : string): void {
        console.log('reveal info');
    }

    changePanel(panel: string): void {
        this.panel = panel;
    }

}

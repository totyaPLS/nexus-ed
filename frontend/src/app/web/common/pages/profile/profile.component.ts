import {Component, DestroyRef, inject} from '@angular/core';
import {distinctUntilChanged, Observable} from "rxjs";
import {User} from "../../util/models/user-models";
import {UserService} from "../../rest/user.service";
import {UserRepository} from "../../state/users.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {getEnumName} from "../../util/enums/Commons";
import {ROLE_TYPE} from "../../util/enums/Role";

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    loading$: Observable<boolean>;
    user$: Observable<User>;

    destroyRef = inject(DestroyRef);
    panel: string = 'default';

    constructor(private userService: UserService,
                private userRepo: UserRepository) {
        this.user$ = this.userService.getLoggedInUserData().pipe(takeUntilDestroyed(this.destroyRef));
        this.loading$ = this.userRepo.userLoading$.pipe(
            distinctUntilChanged(),
        );
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

    protected readonly getEnumName = getEnumName;
    protected readonly ROLE_TYPE = ROLE_TYPE;
}

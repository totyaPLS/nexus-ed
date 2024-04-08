import {Component, DestroyRef, inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Credentials} from "../../util/models/auth-models";
import {TokenService} from "../../../../config/token.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        i {
            opacity: 0.6;
            transition-duration: .12s;
            color: #2196F3;

            &:hover {
                opacity: 1;
            }
        }
    `]
})
export class LoginComponent {
    destroyRef = inject(DestroyRef);

    loginForm = this.createForm({
        uid: '',
        password: ''
    });

    constructor(private tokenService: TokenService,
                private fb: FormBuilder) {
    }


    login() {
        this.tokenService.login(this.loginForm.value as Credentials).pipe(takeUntilDestroyed(this.destroyRef));
    }

    createForm(credentials: Credentials) {
        let formGroup = this.fb.group(credentials);
        formGroup.get('uid')?.addValidators([Validators.required]);
        formGroup.get('password')?.addValidators([Validators.required]);
        return formGroup;
    }
}

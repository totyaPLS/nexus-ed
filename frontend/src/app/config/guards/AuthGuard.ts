import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../token.service";

export const AuthGuard: CanActivateFn = (route, state) => {
    const tokenService = inject(TokenService);
    const router = inject(Router);

    const token = localStorage.getItem('auth_token');

    if (tokenService.isTokenExpired()) {
        tokenService.removeToken();
        router.navigate(['/login']);
        return false;
    }
    return true;
};

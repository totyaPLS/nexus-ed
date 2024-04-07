import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const Guest: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = sessionStorage.getItem('auth_token');

    if (!token) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
};

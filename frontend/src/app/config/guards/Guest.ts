import {CanActivateFn, Router} from '@angular/router';
import {CustomJwtPayload} from "../../web/common/util/entities/CustomJwtPayload";
import {jwtDecode} from "jwt-decode";
import {Role} from "../../web/common/util/enums/Role";
import {inject} from "@angular/core";

export const Guest: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = localStorage.getItem('auth_token');

    if (!token) {
        return true;
    } else {
        router.navigate(['/notfound']);
        return false;
    }
};

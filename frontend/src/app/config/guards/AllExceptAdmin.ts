import {CanActivateFn, Router} from '@angular/router';
import {CustomJwtPayload} from "../../web/common/util/models/custom-jwt-payload";
import {jwtDecode} from "jwt-decode";
import {Role} from "../../web/common/util/enums/Role";
import {inject} from "@angular/core";

export const AllExceptAdmin: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = sessionStorage.getItem('auth_token');

    if (!token) {
        router.navigate(['/login']);
        return false;
    }

    const decodedCredential = jwtDecode<CustomJwtPayload>(token);
    if (decodedCredential.role === Role.ADMIN) {
        router.navigate(['/notfound']);
        return false;
    }

    return true;
};

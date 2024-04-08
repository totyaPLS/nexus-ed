import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "../../web/common/util/models/custom-jwt-payload";
import {Role} from "../../web/common/util/enums/Role";

export const Guest: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const token = sessionStorage.getItem('auth_token');

    if (!token) {
        return true;
    } else {
        const decodedCredential = jwtDecode<CustomJwtPayload>(token);
        if (decodedCredential.role === Role.ADMIN) {
            router.navigate(['/users']);
        } else {
            router.navigate(['/timetable']);
        }
        return false;
    }
};

import {Injectable} from '@angular/core';
import {NexusedRoles} from "./access.model";
import {Observable, of} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "../../web/common/util/models/custom-jwt-payload";

@Injectable({providedIn: 'root'})
export class NexusRoleService {
    decodedCredential!: CustomJwtPayload;

    constructor() {
        const token = sessionStorage.getItem('auth_token');
        if (token) {
            this.decodedCredential = jwtDecode<CustomJwtPayload>(token);
        }
    }

    calculateAccess(requiredRoles: NexusedRoles[]): Observable<boolean> {
        if (!this.decodedCredential) return of(false);
        return of(!!requiredRoles.find(role => role === this.decodedCredential.role));
    }
}

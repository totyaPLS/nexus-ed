import {Injectable} from '@angular/core';
import {NexusedRoles} from "./access.model";
import {Observable, of} from "rxjs";
import {jwtDecode} from "jwt-decode";
import {CustomJwtPayload} from "../../web/common/util/models/custom-jwt-payload";

@Injectable({providedIn: 'root'})
export class NexusRoleService {
    decodedCredential!: CustomJwtPayload;

    calculateAccess(requiredRoles: NexusedRoles[]): Observable<boolean> {
        const token = sessionStorage.getItem('auth_token')!;
        this.decodedCredential = jwtDecode<CustomJwtPayload>(token)
        if (!this.decodedCredential) return of(false);
        return of(!!requiredRoles.find(role => role === this.decodedCredential.role));
    }
}

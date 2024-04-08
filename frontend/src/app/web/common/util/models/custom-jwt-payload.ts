import {JwtPayload} from "jwt-decode";
import {NexusedRoles} from "../../../../config/auth/access.model";

export interface CustomJwtPayload extends JwtPayload {
    role: NexusedRoles;
    exp: number;
}

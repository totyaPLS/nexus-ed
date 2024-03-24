import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserRepository} from "../state/users.repository";
import {SignUpData, User} from "../util/models/user-models";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private userRepo: UserRepository) {
    }

    listUsers() {
        return this.http.get<User[]>(`${this.base}/users`).pipe(
            this.userRepo.withRequestStatus('userLoading', users => this.userRepo.setUsers(users)),
        );
    }

    createUser(user: SignUpData) {
        return this.http.post<User[]>(`${this.base}/register`, user).pipe(
            this.userRepo.withRequestStatus('userLoading', users => this.userRepo.setUsers(users)),
        );
    }

    deleteUser(uid: string) {
        return this.http.delete<User[]>(`${this.base}/users/${uid}`).pipe(
            this.userRepo.withRequestStatus('userLoading', () => this.userRepo.deleteUser(uid)),
        );
    }
}

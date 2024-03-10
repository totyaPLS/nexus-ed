import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserRepository} from "../state/users.repository";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private userRepo: UserRepository) {
    }

    listUsers(): Observable<any> {
        return this.http.get<User[]>(`${this.base}/users`).pipe(
            this.userRepo.withRequestStatus('userLoading', users => this.userRepo.setUsers(users)),
        );
    }

    createUser(user: Omit<User, 'uid'>): Observable<User[]> {
        return this.http.post<User[]>(`${this.base}/register`, user).pipe(
            this.userRepo.withRequestStatus('userLoading', users => this.userRepo.setUsers(users)),
        );
    }

    deleteUser(uid: string): Observable<User[]> {
        return this.http.delete<User[]>(`${this.base}/users/${uid}`).pipe(
            this.userRepo.withRequestStatus('userLoading', () => this.userRepo.deleteUser(uid)),
        );
    }
}

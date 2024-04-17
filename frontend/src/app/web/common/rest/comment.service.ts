import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {CommentRepository} from "../state/comments.repository";
import {Comment} from "../util/models/comment-models";

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private commentRepo: CommentRepository) {
    }

    listComments(announcementId: number) {
        return this.http.get<Comment[]>(`${this.base}/comments/${announcementId}`).pipe(
            this.commentRepo.withRequestStatus('comments', comments => this.commentRepo.setComments(comments)),
        );
    }
}

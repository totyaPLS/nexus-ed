import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AnnouncementRepository} from "../state/announcements.repository";
import {Announcement, AnnouncementReq} from "../util/models/announcement-models";
import {Comment} from "../util/models/comment-models";

@Injectable({
    providedIn: 'root',
})
export class AnnouncementService {
    constructor(private http: HttpClient,
                private announcementRepo: AnnouncementRepository) {
    }

    listAllAnnouncement(subjectId: number, classId: number) {
        return this.http.get<Announcement[]>(`/allAnnouncement/${subjectId}/${classId}`).pipe(
            this.announcementRepo.withRequestStatus(
                'announcements',
                announcements => this.announcementRepo.setAnnouncements(announcements)
            ),
        );
    }

    listAnnouncementsWithComments(subjectId: number, classId: number, endpointName: string) {
        return this.http.get<Announcement[]>(`/${endpointName}/${subjectId}/${classId}`).pipe(
            this.announcementRepo.withRequestStatus(
                'announcements',
                announcements => this.announcementRepo.setAnnouncements(announcements)
            ),
        );
    }

    addComment(comment: Comment) {
        return this.http.post<Announcement>(`/uploadComment`, comment).pipe(
            this.announcementRepo.withRequestStatus(
                'announcements',
                announcement => this.announcementRepo.upsertAnnouncements(announcement)
            ),
        );
    }

    getPermissionOfSubmittedTask(announcementId: number) {
        return this.http.get<boolean>(`/${announcementId}`).pipe(
            this.announcementRepo.withRequestStatus('check', () => {}),
        );
    }

    uploadAnnouncement(announcementReq: AnnouncementReq) {
        return this.http.post<Announcement>(`/uploadAnnouncement`, announcementReq).pipe(
            this.announcementRepo.withRequestStatus(
                'announcements',
                announcement => this.announcementRepo.upsertAnnouncements(announcement)
            ),
        );
    }

}

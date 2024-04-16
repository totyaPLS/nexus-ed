import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AnnouncementRepository} from "../state/announcements.repository";
import {Announcement} from "../util/models/announcement-models";

@Injectable({
    providedIn: 'root',
})
export class AnnouncementService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private announcementRepo: AnnouncementRepository) {
    }

    listAnnouncements(subjectId: number, classId: number) {
        return this.http.get<Announcement[]>(`${this.base}/allAnnouncement/${subjectId}/${classId}`).pipe(
            this.announcementRepo.withRequestStatus(
                'announcements',
                announcements => this.announcementRepo.setAnnouncements(announcements)
            ),
        );
    }
}

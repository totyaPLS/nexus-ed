import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../util/models/timetable-models";
import {LessonsRepository} from "../state/lessons.repository";

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient,
                private lessonsRepo: LessonsRepository) {
    }

    listLessons() {
        return this.http.get<Lesson[]>(`/lessons`).pipe(
            this.lessonsRepo.withRequestStatus('lessons', lessons => this.lessonsRepo.setLessons(lessons)),
        );
    }
}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Lesson} from "../util/models/timetable-models";
import {LessonsRepository} from "../state/lessons.repository";
import {Diary} from "../util/models/diary-models";
import {DiaryRepository} from "../state/diaries.repository";

@Injectable({
    providedIn: 'root',
})
export class LessonService {
    constructor(private http: HttpClient,
                private lessonsRepo: LessonsRepository,
                private diaryRepo: DiaryRepository) {
    }

    listLessons() {
        return this.http.get<Lesson[]>(`/lessons`).pipe(
            this.lessonsRepo.withRequestStatus('lessons', lessons => this.lessonsRepo.setLessons(lessons)),
        );
    }

    listPastLessonsBySubjectId(subjectId: number, classId: number) {
        return this.http.get<Lesson[]>(`/past-lessons/${subjectId}/${classId}`).pipe(
            this.lessonsRepo.withRequestStatus('lessons', lessons => this.lessonsRepo.setLessons(lessons)),
        );
    }

    listDiaries(subjectId: number, classId: number) {
        return this.http.get<Diary[]>(`/diaries/${subjectId}/${classId}`).pipe(
            this.diaryRepo.withRequestStatus('diaries', diaries => this.diaryRepo.setDiaries(diaries)),
        );
    }

    uploadTopic(lessonId: number, topic: string) {
        return this.http.post<Diary>(`/uploadTopic/${lessonId}`, topic).pipe(
            this.diaryRepo.withRequestStatus('diaries', diary => this.diaryRepo.updateDiary(diary)),
        );
    }
}

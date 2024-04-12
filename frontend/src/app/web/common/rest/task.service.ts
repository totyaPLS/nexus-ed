import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TaskRepository} from "../state/tasks.repository";
import {Task} from "../util/models/task-models";

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private base = 'http://localhost:8080';

    constructor(private http: HttpClient,
                private taskRepo: TaskRepository) {
    }

    listTeacherTasks(subjectId: number, classId: number) {
        return this.http.get<Task[]>(`${this.base}/teacherTasks/${subjectId}/${classId}`).pipe(
            this.taskRepo.withRequestStatus('tasks', tasks => this.taskRepo.setTasks(tasks)),
        );
    }
}

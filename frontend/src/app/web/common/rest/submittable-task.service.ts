import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SubmittableTasksRepository} from "../state/submittable-tasks.repository";
import {SubmittableTask} from "../util/models/announcement-models";
import {TaskGradeReq} from "../util/models/grade-models";

@Injectable({
    providedIn: 'root',
})
export class SubmittableTaskService {
    constructor(private http: HttpClient,
                private taskRepo: SubmittableTasksRepository) {
    }

    listTasks(taskId: number) {
        return this.http.get<SubmittableTask[]>(`/submitted-tasks/${taskId}`).pipe(
            this.taskRepo.withRequestStatus('tasks', tasks => this.taskRepo.setSubmittableTasks(tasks)),
        );
    }

    uploadTaskGrade(taskGradeReq: TaskGradeReq) {
        return this.http.post<SubmittableTask>(`/upload-task-grade`, taskGradeReq).pipe(
            this.taskRepo.withRequestStatus('upload', task => this.taskRepo.upsertSubmittableTasks(task)),
        );
    }

    getSubmittableTask(taskId: number) {
        return this.http.get<SubmittableTask>(`/submittable-task/${taskId}`).pipe(
            this.taskRepo.withRequestStatus('tasks', () => {}),
        );
    }

    submitTask(submittableTask: SubmittableTask) {
        return this.http.post<SubmittableTask>(`/submit-task`, submittableTask).pipe(
            this.taskRepo.withRequestStatus('upload', () => {}),
        );
    }
}

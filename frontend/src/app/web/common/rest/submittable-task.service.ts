import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SubmittableTasksRepository} from "../state/submittable-tasks.repository";
import {SubmittableTask} from "../util/models/announcement-models";

@Injectable({
    providedIn: 'root',
})
export class SubmittableTaskService {
    constructor(private http: HttpClient,
                private taskRepo: SubmittableTasksRepository) {
    }

    listTasks() {
        return this.http.get<SubmittableTask[]>(`/submitted-tasks`).pipe(
            this.taskRepo.withRequestStatus('tasks', tasks => this.taskRepo.setSubmittableTasks(tasks)),
        );
    }
}

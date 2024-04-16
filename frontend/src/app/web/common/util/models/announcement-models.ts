import {Task} from "./task-models";

export interface Announcement {
    id: number;
    teacherId: string;
    subjectId: number;
    classId: number;
    title: string;
    description: string;
    published: string;
    task: Task;
}

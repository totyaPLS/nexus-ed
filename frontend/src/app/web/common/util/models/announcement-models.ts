import {Comment} from "./comment-models";

export interface Task {
    announcementId: number;
    deadline: string;
    type: string;
}

export interface Announcement {
    id: number;
    teacherId: string;
    subjectId: number;
    classId: number;
    title: string;
    description: string;
    published: string;
    task?: Task;
    comments: Comment[];
}

export interface SubmittableTask {
    id: number;
    studentId: string;
    studentName: string;
    gradeId: number;
    taskId: number;
    graded: string;
    text: string;
    submitted: string;
    grade: Grade;
}

export interface Grade {
    id: number;
    studentId: string;
    teacherId: string;
    gradeValue: number;
    weight: number;
}

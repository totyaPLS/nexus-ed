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
    comments?: Comment[];
}

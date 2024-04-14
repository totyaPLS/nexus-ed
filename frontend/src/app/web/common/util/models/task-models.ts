import {Announcement} from "./announcement-models";

export interface Task {
    announcementId: number;
    title: string;
    deadline: string;
    type: string;
}

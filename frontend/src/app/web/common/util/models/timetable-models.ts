import {Teaching} from "./teaching-models";

export interface Lesson {
    id: number,
    teaching: Teaching;
    topic: string,
    title: string,
    start: string,
    end: string,
    backgroundColor: string,
    borderColor: string,
    textColor: string,
}

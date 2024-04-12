import {Class} from "./class-models";

export interface Subject {
    id: number;
    name: string;
    classDifficulty: number;
}

export interface SubjectMenuItem {
    id: number;
    subject: Subject;
    classes: Class[];
}

export interface MenuItem {
    label: string;
    icon?: string;
    items?: Omit<MenuItem, 'items'>[];
    routerLink?: string[];
    queryParams?: any[];
}

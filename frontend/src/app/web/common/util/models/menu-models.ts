import {Class} from "./class-models";
import {Subject} from "./teaching-models";

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
    queryParams?: any;
}

import {DestroyRef, inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SubjectMenuRepository} from "../web/common/state/subject-menus.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {SubjectMenuItem} from "../web/common/util/models/menu-models";

@Injectable()
export class BreadcrumbResolver implements Resolve<string> {
    subjectMenuRepo = inject(SubjectMenuRepository);
    destroyRef = inject(DestroyRef);

    subjectMenus$!: Observable<SubjectMenuItem[]>;
    subjectName?: string;
    classLevel?: number;
    classLetter?: string;

    constructor() {
        this.subjectMenus$ = this.subjectMenuRepo.menuItems;
    }

    resolve(route: ActivatedRouteSnapshot) {
        const paramSubjectId: number = JSON.parse(route.paramMap.get('subjectId')!);
        const paramClassId: number = JSON.parse(route.paramMap.get('classId')!);

        this.subjectMenuRepo.menuItems.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(menuItems => {
            const subjectMenu = menuItems.find(menuItem => menuItem.subject.id === paramSubjectId);
            if (subjectMenu) {
                const aClass = subjectMenu.classes.find(aClass => aClass.id === paramClassId);
                if (aClass) {
                    this.subjectName = subjectMenu.subject.name;
                    this.classLevel = aClass.classLevel;
                    this.classLetter = aClass.letter;
                }
            }
        });

        if (this.classLevel && this.classLetter) {
            return `${this.subjectName} ${this.classLevel}.${this.classLetter}`;
        }
        return '';
    }
}

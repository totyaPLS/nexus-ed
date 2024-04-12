import {CanActivateFn, Router} from '@angular/router';
import {DestroyRef, inject} from "@angular/core";
import {SubjectMenuRepository} from "../../web/common/state/subject-menus.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export const SubjectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const subjectMenuRepo = inject(SubjectMenuRepository);
    const destroyRef = inject(DestroyRef);

    let isAllowed = false;
    subjectMenuRepo.menuItems.pipe(takeUntilDestroyed(destroyRef)).subscribe(menuItems => {
        const paramSubjectId = route.paramMap.get('subjectId');
        const paramClassId = route.paramMap.get('classId');
        isAllowed = menuItems.some(menuItem => (menuItem.subject.id).toString() === paramSubjectId);
        isAllowed = menuItems.some(menuItem =>
            menuItem.classes.some(aClass => (aClass.id).toString() === paramClassId)
        );
    });

    if (!isAllowed) {
        router.navigate(['/timetable']);
    }

    return isAllowed;
};

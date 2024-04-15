import {CanActivateFn, Router} from '@angular/router';
import {DestroyRef, inject} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {SubjectService} from "../../web/common/rest/subject.service";
import {Observable} from "rxjs";

export const SubjectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    const subjectService = inject(SubjectService);

    return new Observable<boolean>((observer) => {
        subjectService.listSubjectsForMenu()
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe(menuItems => {
                const paramSubjectId = route.paramMap.get('subjectId');
                const paramClassId = route.paramMap.get('classId');
                const isSubjectAllowed = menuItems.some(menuItem => (menuItem.subject.id).toString() === paramSubjectId);
                const isClassAllowed = menuItems.some(menuItem =>
                    menuItem.classes.some(aClass => (aClass.id).toString() === paramClassId)
                );

                if (!isSubjectAllowed || !isClassAllowed) {
                    router.navigate(['/timetable']);
                    observer.next(false);
                } else {
                    observer.next(true);
                }
                observer.complete();
            });
    });
};

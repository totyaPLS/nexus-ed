import {CanActivateFn, Router} from '@angular/router';
import {DestroyRef, inject} from "@angular/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {AnnouncementService} from "../../web/common/rest/announcement.service";

export const AnnouncementIDGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const destroyRef = inject(DestroyRef);
    const announcementService = inject(AnnouncementService);

    const paramAnnouncementId = route.paramMap.get('announcementId')!;

    return new Observable<boolean>((observer) => {
        announcementService.getPermissionOfSubmittedTask(JSON.parse(paramAnnouncementId))
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe(isAllowed => {
                if (isAllowed) {
                    observer.next(true);
                } else {
                    router.navigate(['./timetable']);
                    observer.next(false);
                }
                observer.complete();
            });
    });
};

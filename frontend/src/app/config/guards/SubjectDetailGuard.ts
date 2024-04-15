import {CanActivateFn, Router} from '@angular/router';
import {DETAIL, getEnumName} from "../../web/common/util/enums/Subject";
import {inject} from "@angular/core";

export const SubjectDetailGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);

    const pageName = route.paramMap.get('detail')!;

    if (getEnumName(pageName, DETAIL)) {
        return true;
    }

    router.navigate(['/timetable']);
    return false;
};

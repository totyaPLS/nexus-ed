import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {DETAIL, getEnumName} from "../web/common/util/enums/Subject";

@Injectable()
export class SubjectDetailsBreadcrumbResolver implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot) {
        const pageName = route.paramMap.get('announcementType')!;
        return getEnumName(pageName, DETAIL);
    }
}

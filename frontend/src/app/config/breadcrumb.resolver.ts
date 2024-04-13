import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable()
export class BreadcrumbResolver implements Resolve<string> {

    constructor() {}

    resolve(route: ActivatedRouteSnapshot) {
        const subjectName = route.queryParamMap.get('0')!;
        const classLevel = route.queryParamMap.get('1');
        const classLetter = route.queryParamMap.get('2');
        if (classLevel && classLetter) {
            return `${subjectName} ${classLevel}.${classLetter}`;
        }
        return subjectName;
    }
}

import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable()
export class BreadcrumbResolver implements Resolve<string> {

    constructor(private activatedRoute: ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot) {
        let breadcrumbTitle = 'fasfdsdf';
        breadcrumbTitle = route.queryParamMap.get('subjectName')!;
        console.log(breadcrumbTitle); // TODO
        /*this.activatedRoute.queryParams.subscribe(value => {
            breadcrumbTitle = value['subjectName']
        });*/
        return breadcrumbTitle;
    }
}

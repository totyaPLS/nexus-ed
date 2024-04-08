import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {Observable, Subject, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NexusRoleService} from "./nexus-role.service";
import {NexusedRoles} from "./access.model";

@Directive()
export abstract class RolesDirectiveBase {
    protected change = new Subject<void>();

    protected constructor() {
        this.change.pipe(
            switchMap(() => this.doCheck()),
            takeUntilDestroyed(),
        ).subscribe(result => this.handleChange(result));
    }

    protected abstract doCheck(): Observable<boolean>;

    protected abstract handleChange(display: boolean): void;
}

@Directive({
    selector: '[showForRoles]'
})
export class ShowForRolesDirective extends RolesDirectiveBase {
    constructor(protected templateRef: TemplateRef<any>, protected viewContainer: ViewContainerRef,
                protected roleService: NexusRoleService) {
        super();
    }

    private _showForRoles: NexusedRoles[] = [];

    @Input()
    set showForRoles(value: NexusedRoles[]) {
        this._showForRoles = value;
        this.change.next();
    }

    protected doCheck(): Observable<boolean> {
        return this.roleService.calculateAccess(this._showForRoles);
    }

    protected handleChange(display: boolean) {
        this.viewContainer.clear();
        if (display) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}

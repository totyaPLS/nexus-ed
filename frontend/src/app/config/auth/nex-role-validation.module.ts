import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowForRolesDirective} from "./nexus-role-validation.directive";
import {NexusRoleService} from "./nexus-role.service";

@NgModule({
  declarations: [ShowForRolesDirective],
    imports: [
        CommonModule
    ],
    exports: [ShowForRolesDirective]
})
export class NexRoleValidationModule {
    static forRoot(): ModuleWithProviders<NexRoleValidationModule> {
        return {
            ngModule: NexRoleValidationModule,
            providers: [
                NexusRoleService,
            ],
        };
    }
}

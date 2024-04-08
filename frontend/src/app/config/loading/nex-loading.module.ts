import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NexusLoadingDirective} from "./nexus-loading.directive";

@NgModule({
  declarations: [NexusLoadingDirective],
  imports: [
    CommonModule
  ],
    exports: [NexusLoadingDirective]
})
export class NexLoadingModule {
    static forRoot(): ModuleWithProviders<NexLoadingModule> {
        return {
            ngModule: NexLoadingModule
        };
    }
}

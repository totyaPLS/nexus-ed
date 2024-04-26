import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NexLoadingModule} from "../../../../config/loading/nex-loading.module";
import {UtcToLocalTimePipe} from "./utc-to-local-time.pipe";

@NgModule({
  declarations: [UtcToLocalTimePipe],
  imports: [
    CommonModule
  ],
    exports: [UtcToLocalTimePipe]
})
export class NexusTimeModule {
    static forRoot(): ModuleWithProviders<NexusTimeModule> {
        return {
            ngModule: NexLoadingModule
        };
    }
}

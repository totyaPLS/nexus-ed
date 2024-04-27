import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {NexLoadingModule} from "../../../../config/loading/nex-loading.module";
import {NexRoleValidationModule} from "../../../../config/auth/nex-role-validation.module";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        CardModule,
        ButtonModule,
        DividerModule,
        NexLoadingModule,
        NexRoleValidationModule
    ],
	declarations: [ProfileComponent]
})
export class ProfileModule { }

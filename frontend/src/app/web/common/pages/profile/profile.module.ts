import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        CardModule,
        ButtonModule,
        DividerModule
    ],
	declarations: [ProfileComponent]
})
export class ProfileModule { }

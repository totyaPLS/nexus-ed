import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
	templateUrl: './notfound.component.html'
})
export class NotfoundComponent {
    constructor(private _location: Location) {
    }

    navigateBack() {
        this._location.back();
        this._location.back();
    }
}

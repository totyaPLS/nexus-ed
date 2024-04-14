import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AppSidebarComponent} from './app.sidebar.component';
import {Router} from "@angular/router";
import {TokenService} from "../config/token.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopbarComponent {
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    constructor(public layoutService: LayoutService,
                public el: ElementRef,
                private router: Router,
                private tokenService: TokenService) {}

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onProfileButtonClick() {
        this.layoutService.showRightMenu();
    }

    onSearchClick() {
        this.layoutService.toggleSearchBar();
    }

    onRightMenuClick() {
        this.layoutService.showRightMenu();
    }

    get logo() {
        const logo =
            this.layoutService.config().menuTheme === 'white' ||
            this.layoutService.config().menuTheme === 'orange'
                ? 'dark'
                : 'white';
        return logo;
    }

    logout() {
        this.tokenService.removeTokens();
        this.router.navigateByUrl('/login');
    }
}

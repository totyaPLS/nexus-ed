import {OnInit, Component} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Órarend',
                icon: 'pi pi-calendar',
            },
            { separator: true },
            {
                label: 'Tantárgyak',
                icon: 'pi pi-book',
                items: [
                    {
                        label: 'Irodalom',
                        icon: 'pi pi-fw pi-chevron-right',
                        items: [
                            {
                                label: '12. évfolyam',
                                icon: 'pi pi-fw pi-circle',
                                items: [
                                    {
                                        label: 'A. osztály',
                                        icon: 'pi pi-fw pi-circle-fill',
                                        routerLink: ['/subjects/class12/a']
                                    },
                                    {
                                        label: 'B. osztály',
                                        icon: 'pi pi-fw pi-circle-fill',
                                        routerLink: ['/subjects/class12/a']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Nyelvtan',
                        icon: 'pi pi-fw pi-chevron-right',
                        routerLink: ['/subjects/grammar']
                    }
                ]
            },
            { separator: true },
            {
                label: 'Értékelés',
                icon: 'pi pi-file-edit',
            },
            {
                label: 'Osztályok',
                icon: 'pi pi-users',
            },
            {
                label: 'Statisztikák',
                icon: 'pi pi-chart-bar',
            },
            {
                label: 'Levelezés',
                icon: 'pi pi-envelope',
            },
        ];
    }
}

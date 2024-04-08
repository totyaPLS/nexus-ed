import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {distinctUntilChanged, Observable} from "rxjs";
import {SubjectService} from "../web/common/rest/subject.service";
import {SubjectRepository} from "../web/common/state/subjects.repository";
import {Subject} from "../web/common/util/models/teaching-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    loading$: Observable<boolean>;
    subjects$!: Observable<Subject[]>;

    destroyRef = inject(DestroyRef);

    constructor(private subjectService: SubjectService,
                private subjectRepository: SubjectRepository) {
        this.subjects$ = subjectRepository.subjects$;
        this.loading$ = this.subjectRepository.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    model: any[] = [];

    ngOnInit() {
        this.subjectService.listSubjectsForMenu().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();

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

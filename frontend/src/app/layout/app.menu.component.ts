import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {distinctUntilChanged, Observable} from "rxjs";
import {SubjectService} from "../web/common/rest/subject.service";
import {SubjectRepository} from "../web/common/state/subjects.repository";
import {MenuItem, Subject, SubjectMenuItem} from "../web/common/util/models/teaching-models";
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
        this.model = [
            {
                label: 'Órarend',
                icon: 'pi pi-calendar',
            },
            { separator: true },
            {
                label: 'Tantárgyak',
                icon: 'pi pi-book',
                items: null,
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
        this.subjectService.listSubjectsForMenu().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            value => {
                this.model.forEach(menuItem => {
                    if (menuItem.label === 'Tantárgyak') {
                        menuItem.items = this.convertToMenuItem(value);
                    }
                });
            }
        );
    }

    convertToMenuItem(subjectClassesTree: SubjectMenuItem[]): MenuItem[] {
        return subjectClassesTree.map(subjectClass => {
            let menuItem: MenuItem;
            if (subjectClass.classes.length <= 1) {
                menuItem = {
                    label: subjectClass.subject.name,
                    routerLink: subjectClass.classes.map(aClass => (
                        `/subjects/${subjectClass.subject.id}/${aClass.id}`
                    ))
                };
            } else {
                menuItem = {
                    label: `${subjectClass.subject.name} ${subjectClass.subject.classDifficulty}. évf.`,
                    items: subjectClass.classes.map(aClass => ({
                        label: `${aClass.classLevel}.${aClass.letter}`,
                        icon: 'pi pi-fw pi-circle',
                        routerLink: [`/subjects/${subjectClass.subject.id}/${aClass.id}`]
                    }))
                };
            }
            return menuItem;
        });
    }
}

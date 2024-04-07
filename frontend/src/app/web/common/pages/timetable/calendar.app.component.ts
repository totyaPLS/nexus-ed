import {Component, DestroyRef, inject, OnInit} from '@angular/core';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import huLocale from '@fullcalendar/core/locales/hu';
import {Lesson} from "../../util/models/timetable-models";
import {LessonsRepository} from "../../state/lessons.repository";
import {distinctUntilChanged, Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LessonService} from "../../rest/lesson.service";

@Component({
    templateUrl: './calendar.app.component.html',
    styleUrls: ['./calendar.app.component.scss']
})
export class CalendarAppComponent implements OnInit {
    loading$: Observable<boolean>;
    lessons$!: Observable<Lesson[]>;
    today: string = '';
    calendarOptions: any;
    showDialog: boolean = false;
    clickedEvent: any = null;
    view: string = '';
    changedEvent: any;

    destroyRef = inject(DestroyRef);

    constructor(private lessonService: LessonService,
                private lessonsRepository: LessonsRepository) {
        this.lessons$ = lessonsRepository.lessons$;
        this.loading$ = this.lessonsRepository.listLoading$.pipe(
            distinctUntilChanged(),
        );
    }

    ngOnInit(): void {
        this.setCurrentDate();

        this.lessonService.listLessons().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(
            lessons => {
                this.calendarOptions = {...this.calendarOptions, ...{events: lessons}};
            }
        );

        this.calendarOptions = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            locale: huLocale,
            height: 720,
            initialDate: this.today,
            initialView: 'timeGridWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e: MouseEvent) => this.onEventClick(e),
        };
    }

    onEventClick(e: any) {
        this.clickedEvent = e.event;
        let plainEvent = e.event.toPlainObject({ collapseExtendedProps: true, collapseColor: true });
        this.view = 'display';
        this.showDialog = true;

        this.changedEvent = { ...plainEvent, ...this.clickedEvent };
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end ? this.clickedEvent.end : this.clickedEvent.start;
    }

    setCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        this.today = `${year}-${month}-${day}`;
    }

}

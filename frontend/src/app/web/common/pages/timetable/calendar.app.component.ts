import { Component, OnInit } from '@angular/core';
// @fullcalendar plugins
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import huLocale from '@fullcalendar/core/locales/hu';
import {Lesson} from "../../util/models/timetable-models";

@Component({
    templateUrl: './calendar.app.component.html',
    styleUrls: ['./calendar.app.component.scss']
})
export class CalendarAppComponent implements OnInit {
    lessons: Lesson[] = [];
    today: string = '';
    calendarOptions: any;
    showDialog: boolean = false;
    clickedEvent: any = null;
    view: string = '';
    changedEvent: any;

    constructor() {
        // TODO: init lessons
    }

    ngOnInit(): void {
        // this.setCurrentDate();
        this.today = "2022-05-11";

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
            events: this.lessons,
            editable: false,
            selectable: false,
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

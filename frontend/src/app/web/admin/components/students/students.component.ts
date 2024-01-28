import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StudentService} from "../../../common/rest/student.service";
import {Student, StudentRepository} from "../../../common/state/students.repository";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    templateUrl: './students.component.html',
    providers: [MessageService, ConfirmationService]
})
export class StudentsComponent implements OnInit {

    students$!: Observable<Student[]>;
    first = 0;
    rows = 10;

    destroyRef = inject(DestroyRef);

    constructor(private studentService: StudentService,
                private studentRepo: StudentRepository) {
        this.students$ = studentRepo.students$;
    }

    ngOnInit(): void {
        this.studentService.listStudents().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }

    next() {
        this.first = this.first + this.rows;
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }

    isLastPage(): boolean {
        if (this.students$) {
            this.students$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(students => {
                return this.first === students.length - this.rows;
            });
        }
        return true;
    }

    isFirstPage(): boolean {
        return this.students$ ? this.first === 0 : true;
    }

    openNew() {
    }

    editProduct(student: Student) {}

    deleteProduct(studentId: number) {
        this.studentService.deleteStudent(studentId).subscribe();
    }
}

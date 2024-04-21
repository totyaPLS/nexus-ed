import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from "../../../../util/models/comment-models";
import {DatePipe, NgForOf} from "@angular/common";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {NexLoadingModule} from "../../../../../../config/loading/nex-loading.module";

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [
        NgForOf,
        DatePipe,
        InputTextareaModule,
        ButtonModule,
        RippleModule,
        ReactiveFormsModule,
        NexLoadingModule
    ],
    templateUrl: 'comments.component.html',
    styles: [`
        img {
            border-radius: 50%;
            object-fit: cover;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
    @Input() announcementId!: number;
    @Input() comments!: Comment[];
    @Input() loading$!: Observable<boolean>;
    @Output() commentClicked = new EventEmitter<Comment>();

    commentControl: FormControl<string | null>;

    constructor() {
        this.commentControl = new FormControl<string>('');
    }

    triggerComment() {
        const comment: Comment = {
            id: 0,
            personId: '',
            announcementId: this.announcementId,
            text: this.commentControl.getRawValue()!,
            published: '',
        }
        this.commentClicked.emit(comment);
    }

    get isCommentEmpty() {
        return !this.commentControl.getRawValue() || this.commentControl.getRawValue() === '';
    }
}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Comment} from "../../../../util/models/comment-models";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NexLoadingModule} from "../../../../../../config/loading/nex-loading.module";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {InputTextModule} from "primeng/inputtext";

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
        NexLoadingModule,
        OverlayPanelModule,
        InputTextModule,
        NgIf
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
    @Output() commentClicked = new EventEmitter<Comment>();

    commentControl: FormControl<string | null>;

    textContent: string = '';

    emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '🤪', '😜', '😝', '😛',
        '🤑', '😎', '🤓', '🧐', '🤠', '🥳', '🤗', '🤡', '😏', '😶', '😐', '😑', '😒', '🙄', '🤨', '🤔', '🤫', '🤭', '🤥', '😳', '😞', '😟', '😠', '😡', '🤬', '😔',
        '😟', '😠', '😡', '🤬', '😔', '😕', '🙁', '😬', '🥺', '😣', '😖', '😫', '😩', '🥱', '😤', '😮', '😱', '😨', '😰', '😯', '😦', '😧', '😢', '😥', '😪', '🤤'
    ];

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

    onEmojiSelect(emoji: string) {
        this.textContent += emoji;
    }
}

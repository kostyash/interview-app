import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "../entities/post";

@Component({
    selector: "app-post",
    template: `
        <div>{{post.datePublished | date }}</div>
        <div>{{post.text}}</div>
        <button (click)="onLikeClicked()">{{post.liked ? "UNLIKE" : "LIKE"}}</button>
    `,
    standalone: true,
    imports: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
    @Input()
    post: IPost = {
        id: 0,
        username: "",
        text: "",
        datePublished: 0,
        liked: false
    };

    @Output()
    likeToggled = new EventEmitter<boolean>();

    protected onLikeClicked(): void {
        this.likeToggled.emit(!this.post.liked);
    }
}

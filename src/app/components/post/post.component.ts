import { DatePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IPost } from "../../entities/post";

@Component({
    selector: "app-post",
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
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

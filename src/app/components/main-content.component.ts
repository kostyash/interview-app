import { Component, inject, OnInit } from "@angular/core";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectCurrentUsersIds } from "../state";
import { AsyncPipe, NgFor } from "@angular/common";
import { deleteAllPosts } from "../state/post.actions";

@Component({
    selector: "app-main-content",
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    imports: [PostsListComponent, AsyncPipe, NgFor],
    standalone: true
})
export class MainContentComponent implements OnInit{

    store = inject(Store);

    usernames$!: Observable<string[]>;

    ngOnInit(): void {
        this.store.dispatch(deleteAllPosts());
        this.usernames$ = this.store.select(selectCurrentUsersIds);
    }
}

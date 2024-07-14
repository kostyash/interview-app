import { Component, inject } from "@angular/core";
import { PostsListComponent } from "./posts-list/posts-list.component";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectCurrentUsersIds } from "../state";
import { AsyncPipe, NgFor } from "@angular/common";

@Component({
    selector: "app-main-content",
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    imports: [PostsListComponent, AsyncPipe, NgFor],
    standalone: true
})
export class MainContentComponent {

    store = inject(Store);

    usernames$: Observable<string[]> = this.store.select(selectCurrentUsersIds);
}

import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { User } from "../entities/contracts";
import { select, Store } from "@ngrx/store";
import { selectAllUsers } from "../state";
import { Observable } from "rxjs";

@Component({
    selector: "app-users-list",
    template: `
        <h2>Following</h2>
        <ul>
            <li *ngFor="let user of users$ | async">
                {{user.username}}
                {{user.totalPosts}}
                {{user.likedPosts}}

        </ul>
    `,
    standalone: true,
    imports: [NgFor, AsyncPipe]
})
export class UsersListComponent implements OnInit {

    store = inject(Store);

    users$: Observable<User[]> = this.store.select(selectAllUsers)


    ngOnInit(): void {


    }



}
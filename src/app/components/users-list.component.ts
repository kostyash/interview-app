import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../entities/contracts";
import { selectAllUsers } from "../state";
import { selectUser } from "../state/user.actions";
import { UserComponent } from "./user/user.component";

@Component({
    selector: "app-users-list",
    templateUrl: "./users-list.component.html",
    styleUrls: ["./users-list.component.scss"],
    standalone: true,
    imports: [NgFor, AsyncPipe, UserComponent]
})
export class UsersListComponent {


    store = inject(Store);

    users$: Observable<User[]> = this.store.select(selectAllUsers);



    selectUser(userId: string) {
        this.store.dispatch(selectUser({ userId }));
    }

}
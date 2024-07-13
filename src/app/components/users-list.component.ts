import { AsyncPipe, NgFor } from "@angular/common";
import { Component, inject } from "@angular/core";

@Component({
    selector: "app-users-list",
    template: `
        <h2>Following</h2>
        <ul>

        </ul>
    `,
    standalone: true,
    imports: [NgFor, AsyncPipe]
})
export class UsersListComponent {

}
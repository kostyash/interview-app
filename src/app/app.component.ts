import { Component } from '@angular/core';
import { MainContentComponent } from "./components/main-content.component";
import { UsersListComponent } from "./components/users-list.component";

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>
        Interview Social
      </h1>
    </header>
    <nav>
      <app-users-list></app-users-list>
    </nav>

    <main>
      <app-main-content></app-main-content>
    </main>
  `,
  styles: [`
    :host {
      display: grid;
      gap: 0.5rem;
      height: 100vh;
      grid-template-rows: auto 1fr;
      grid-template-columns: 300px 1fr;
    }

    header {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    nav {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 1;
      grid-column-end: 2;
    }

    main {
      grid-row-start: 2;
      grid-row-end: 3;
      grid-column-start: 2;
      grid-column-end: 3;
    }

    header, nav, main {
      background-color: whitesmoke;
      padding: 0.5rem;
    }
  `],
  standalone: true,
  imports: [UsersListComponent, MainContentComponent]
})
export class AppComponent {

}

import { Component, OnInit } from '@angular/core';
import { MainContentComponent } from "./components/main-content.component";
import { UsersListComponent } from "./components/users-list.component";
import { Store } from '@ngrx/store';
import { getUsers } from './state/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [UsersListComponent, MainContentComponent]
})
export class AppComponent implements OnInit {


  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());
  }

}

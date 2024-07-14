import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  getUsers,
  loadUsers,
  logError
} from './user.actions';

import { UsersService } from '../users.service';
import { getPosts } from './post.actions';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(action =>
        this.usersService.getUsers().pipe(      
          switchMap(users => [loadUsers({ users }), getPosts({ usernames: users.slice(0,2).map(user => user.username)})]),
          catchError(error => of(logError({ error })))
        )
      )
    )
  );

  logActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logError),
      tap(err => console.log(err))
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }
}
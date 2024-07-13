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

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(action =>
        this.usersService.getUsers().pipe(
          tap(console.log),
          map(users => loadUsers({ users })),
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
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import {
  getUsers,
  loadUsers,
  logError,
  selectUser
} from './user.actions';

import { selectCurrentUsersIds } from '.';
import { UsersService } from '../users.service';
import { deleteOldPosts, getPosts, getPostsByUser } from './post.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      switchMap(action =>
        this.usersService.getUsers().pipe(
          switchMap(users => [loadUsers({ users }), getPosts({ usernames: users.slice(0, 2).map(user => user.username) })]),
          catchError(error => of(logError({ error })))
        )
      )
    )
  );

  selectUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(selectUser),
      concatLatestFrom(() => this.store$.select(selectCurrentUsersIds)),
      switchMap(([action, currentUserIds]) =>
        ([deleteOldPosts({ currentUserIds }), getPostsByUser({ username: action.userId })])
      )
    )
  );

  logActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logError),
      tap(err => console.log(err))
    ), { dispatch: false });

  constructor(
    private store$: Store,
    private actions$: Actions,
    private usersService: UsersService
  ) { }
}
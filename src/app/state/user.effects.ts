import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  getUser,
  getUsers,
  loadUsers,
  logError,
  selectUser,
  updateUser
} from './user.actions';

import { Store } from '@ngrx/store';
import { selectCurrentUsersIds } from '.';
import { UsersService } from '../users.service';
import { deleteOldPosts, getPosts, getPostsByUser } from './post.actions';

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

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(action =>
        this.usersService.getUser(action.username).pipe(       
          map(users => updateUser({
            user: users[0]
          })),
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
    private store$: Store,
    private actions$: Actions,
    private usersService: UsersService
  ) { }
}
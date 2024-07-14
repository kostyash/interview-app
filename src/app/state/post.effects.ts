import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  getPosts,
  getPostsByUser,
  loadPosts,
  logError,
  toggleLike,
  updatePost
} from './post.actions';

import { Store } from '@ngrx/store';
import { selectPostById } from '.';
import { PostsService } from '../posts.service';

@Injectable()
export class PostEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),
      map(action => action.usernames),
      switchMap(usernames => usernames.map(username => getPostsByUser({ username }))
      )
    )
  );

  getPostsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostsByUser),
      mergeMap(action =>
        this.postsService.getPosts(action.username).pipe(
          map(posts => loadPosts({ posts })),
          catchError(error => of(logError({ error })))
        )
      )
    )
  );

  toggleLike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleLike),
      concatLatestFrom((action) => this.store$.select(selectPostById(action.id))),
      switchMap(([action, post]) => {
        if (!post) {
          return (throwError(() => new Error('no post')));
        }
        return this.postsService.setPostStatus({...post, liked: action.like}).pipe(
          map(post => updatePost({
            update: {
              id: post.id,
              changes: {
                liked: action.like
              } 
            }
          })),
          catchError(error => of(logError({ error })))
        )
      })
    )
  );

  logError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logError),
      tap(err => console.log(err))
    ), { dispatch: false });

  constructor(
    private store$: Store,
    private actions$: Actions,
    private postsService: PostsService
  ) { }
}
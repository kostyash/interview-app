import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {
  getPosts,
  getPostsByUser,
  loadPosts,
  addPosts,
  logError
} from './post.actions';

import { PostsService } from '../posts.service';

@Injectable()
export class PostEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPosts),     
      map(action => action.usernames),
      switchMap(usernames => usernames.map(username => getPostsByUser({username}))      
      )
    )
  );

  getPostsByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPostsByUser),     
      switchMap(action =>
        this.postsService.getPosts(action.username).pipe(          
          map(posts => loadPosts({ posts })),
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
    private postsService: PostsService
  ) { }
}
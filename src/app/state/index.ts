import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromUser from './user.selectors';
  import * as fromPost from './post.selectors';
  import * as fromUserState from './user.reducer';
  import * as fromPostsState from './post.reducer';
  
  export interface State {
    users: fromUserState.UserState;
    posts: fromPostsState.PostState

  }
  
  export const reducers: ActionReducerMap<State> = {
    users: fromUserState.userReducer,
    posts: fromPostsState.postReducer
  };
  
  export const selectUserState = createFeatureSelector<fromUserState.UserState>('users');
  export const selectPostState = createFeatureSelector<fromPostsState.PostState>('posts');
  
  export const selectUserIds = createSelector(
    selectUserState,
    fromUser.selectUserIds 
  );
  export const selectUserEntities = createSelector(
    selectUserState,
    fromUser.selectUserEntities
  );
  export const selectAllUsers = createSelector(
    selectUserState,
    fromUser.selectAllUsers
  );
  export const selectUserTotal = createSelector(
    selectUserState,
    fromUser.selectUserTotal
  );
  export const selectCurrentUsersIds = createSelector(
    selectUserState,
    fromUser.getCurrentUsersIds
  );

  export const selectPostsByUserName = (username: string) => createSelector(    
    selectPostState,
    state => { 
      const posts = fromPost.selectAllPosts(state);
      return posts.filter(post => post.username === username );
    }
  );
  
 /*  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userId && userEntities[userId]
  ); */
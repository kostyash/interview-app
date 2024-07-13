import {
    createSelector,
    createFeatureSelector,
    ActionReducerMap,
  } from '@ngrx/store';
  import * as fromUser from './user.selectors';
  import * as fromUserState from './user.reducer';
  
  export interface State {
    users: fromUserState.UserState;
  }
  
  export const reducers: ActionReducerMap<State> = {
    users: fromUserState.userReducer,
  };
  
  export const selectUserState = createFeatureSelector<fromUserState.UserState>('users');
  
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
  
 /*  export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userId && userEntities[userId]
  ); */
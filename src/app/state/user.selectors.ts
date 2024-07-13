import { usersAdapter, UserState } from "./user.reducer";

export const getCurrentUsersIds = (state: UserState) => state.currentUsersIds;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = usersAdapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
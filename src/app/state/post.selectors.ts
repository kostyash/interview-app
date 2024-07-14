import { postsAdapter } from "././post.reducer";



// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = postsAdapter.getSelectors();

// select the array of user ids
export const selectPostIds = selectIds;

// select the dictionary of user entities
export const selectPostEntities = selectEntities;

// select the array of users
export const selectAllPosts = selectAll;

// select the total user count
export const selectPostsTotal = selectTotal;
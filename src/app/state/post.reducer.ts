import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { IPost } from "../entities/post";
import * as PostActions from './post.actions';

export interface PostState extends EntityState<IPost> {
}


export function selectPostId(a: IPost): number {
    return a.id;
}

export function sortByDate(a: IPost, b: IPost): number {
    return a.datePublished - b.datePublished;
}


export const postsAdapter: EntityAdapter<IPost> = createEntityAdapter<IPost>({
    selectId: selectPostId,
    sortComparer: sortByDate,
});


export const initialState: PostState = postsAdapter.getInitialState({
});


export const postReducer = createReducer(initialState,
    on(PostActions.deleteAllPosts, (state) => {
        return postsAdapter.removeAll(state);
    }),
    on(PostActions.loadPosts, (state, { posts }) => {

        return postsAdapter.addMany(posts, state);
    }),
    on(PostActions.addPosts, (state, { posts }) => {

        return postsAdapter.addMany(posts, state);
    }),
    on(PostActions.deletePostsByUserName, (state, { username }) => {
        return postsAdapter.removeMany(post => post.username === username, state);
    }),
    on(PostActions.deleteOldPosts, (state, { currentUserIds }) => {
        return postsAdapter.removeMany(post => !currentUserIds.includes(post.username), state);
    }),
    on(PostActions.updatePost, (state, { update }) => {
        return postsAdapter.updateOne(update, state);
    })
);
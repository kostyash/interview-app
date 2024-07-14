import { createAction, props } from "@ngrx/store";
import { User } from "../entities/contracts";
import { IPost } from "../entities/post";

export const loadPosts = createAction('[Post/API] Load Posts', props<{ posts: IPost[] }>());
export const addPosts = createAction('[Post/API] Add Posts', props<{ posts: IPost[] }>());
export const deleteAllPosts = createAction('[Post/API] Delete All Posts');
export const deleteOldPosts = createAction('[Post/API] Delete Old Posts', props<{ currentUserIds: string[] }>());
export const deletePostsByUserName = createAction('[Post/API] Delete Posts', props<{ username: string }>());

export const togglePost = createAction('[Post/API] Select User', props<{ id: number, like: boolean }>());

export const getPosts = createAction('[Post/API] Get Posts', props<{ usernames: string[] }>());
export const getPostsByUser = createAction('[Post/API] Get Posts By User', props<{ username: string }>());
export const logError = createAction('[Post/API] Log Error', props<{ error: any }>());

import { createAction, props } from "@ngrx/store";
import { User } from "../entities/contracts";

export const loadUsers = createAction('[User/API] Load Users', props<{ users: User[] }>());

export const selectUser = createAction('[User/API] Select User', props<{ userId: string }>());

export const getUsers = createAction('[User/API] Get Users');
export const logError = createAction('[User/API] Log Error', props<{ error: any }>());
    
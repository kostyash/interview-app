import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { User } from "../entities/contracts";
import { createReducer } from "@ngrx/store";

export interface State extends EntityState<User> {
    selectedUsersIds: string[];
}


export function selectUserId(a: User): string {
    return a.username;
}

export function sortByName(a: User, b: User): number {
    return a.username.localeCompare(b.username);
}


export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: selectUserId,
    sortComparer: sortByName,
});


export const initialState: State = adapter.getInitialState({
   
    selectedUsersIds: [],
});


export const userReducer = createReducer(initialState);
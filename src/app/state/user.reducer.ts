import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { User } from "../entities/contracts";
import * as UserActions from './user.actions';

export interface UserState extends EntityState<User> {
    currentUsersIds: string[];
}


export function selectUserId(a: User): string {
    return a.username;
}

export function sortByName(a: User, b: User): number {
    return a && a.username.localeCompare(b.username);
}


export const usersAdapter: EntityAdapter<User> = createEntityAdapter<User>({
    selectId: selectUserId,
    sortComparer: sortByName,
});


export const initialState: UserState = usersAdapter.getInitialState({

    currentUsersIds: [],
});


export const userReducer = createReducer(initialState,
    on(UserActions.selectUser, (state, { userId }) => {
        const currentUsersIds = [...state.currentUsersIds];
        currentUsersIds.unshift(userId);
        if (currentUsersIds.length > 2) {
            currentUsersIds.pop();
        }
        return { ...state, currentUsersIds: currentUsersIds };
    }),
    on(UserActions.loadUsers, (state, { users }) => {
        const currentUsersIds = users.filter((user, index) => index < 2).map(user => user.username);
        return usersAdapter.setAll(users, { ...state, currentUsersIds: currentUsersIds });
    }),
    on(UserActions.updateUser, (state, { user }) => {
        return usersAdapter.upsertOne(user, state);
    })
);
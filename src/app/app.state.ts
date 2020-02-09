import { ActionReducerMap } from '@ngrx/store';
import { uiReducer, UiState } from './auth/ui.reducers';
import { userReducer, UserState } from './auth/user.reducers';
import { User } from './auth/user.model';

export interface AppState {
    ui: UiState;
    user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
    ui : uiReducer,
    user: userReducer
};

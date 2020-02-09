import { actions, UPDATE_USER } from './user.actions';
import { User } from './user.model';


export interface UserState {
    user: User;
}

export function userReducer(state: UserState, action: actions): UserState {
    switch ( action.type ) {
        case UPDATE_USER:
            return {user: {...state.user} };
        default:
            return state;
    }
}

import { Action } from '@ngrx/store';
import { UserState } from './user.reducers';
import { User } from './user.model';

export const UPDATE_USER = '[User Update]';

export class UpdateUserAction implements Action {
    readonly type = UPDATE_USER;
    constructor( public payload: User ) {}
}

export type actions = UpdateUserAction;

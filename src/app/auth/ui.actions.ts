import { Action } from '@ngrx/store';

export const LOADING = '[Action Loading...]';
export const END_LOADING = '[Action End Loading...]';

export class ActivateLoading implements Action {
    readonly type = LOADING;
}

export class DeactivateLoading implements Action {
    readonly type = END_LOADING;
}

export type actions = ActivateLoading | DeactivateLoading;

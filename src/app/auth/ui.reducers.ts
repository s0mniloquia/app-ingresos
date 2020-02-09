import { actions, LOADING, END_LOADING } from './ui.actions';
import { AppState } from '../app.state';

export interface UiState  {
    isLoading: boolean;
}


const estadoInicial: UiState = {
    isLoading : false
};

export function uiReducer( state = estadoInicial, action: actions): UiState {
    switch ( action.type ) {
        case LOADING:
            return {...state, isLoading: true };
        case END_LOADING:
            return {...state, isLoading: false};
        default:
            return state;
    }

}


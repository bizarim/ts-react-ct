import { combineReducers } from 'redux';
import { productReducer, FormState } from './form/reducer';

// [ Redux 만들기 ] step 4: reducer 등록
// reducer 등록

export interface RootState {
    form: FormState;
}

export const rootReducer = combineReducers({
    form: productReducer,
});


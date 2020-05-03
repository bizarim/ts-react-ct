import { combineReducers } from 'redux';
import { FormApiState, formApiReducer } from './modules/form/api/reducer';
import { FormViewState, formViewReducer } from './modules/form/view/reducer';



// [ Redux 만들기 ] step 4: reducer 등록
// reducer 등록

export interface RootState {
    formApi: FormApiState;
    formView: FormViewState;
}

export const rootReducer = combineReducers({
    formApi: formApiReducer,
    formView: formViewReducer,
});


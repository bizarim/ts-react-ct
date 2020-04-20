import { combineReducers } from 'redux';
import { FormInputState, formInputReducer } from './form';
import { FormModalState, formModalReducer } from './modal/reducer';


// [ Redux 만들기 ] step 4: reducer 등록
// reducer 등록

export interface RootState {
    formInput: FormInputState;
    formModal: FormModalState;
}

export interface FormState {

}

export const rootReducer = combineReducers({
    formInput: formInputReducer,
    formModal: formModalReducer,
});


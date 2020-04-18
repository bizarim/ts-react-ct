import { combineReducers } from 'redux';
import { productReducer, ProductState } from './form/reducer';

// [ Redux 만들기 ] step 4: reducer 등록
// reducer 등록

export interface RootState {
    product: ProductState;
}

export const rootReducer = combineReducers({
    product: productReducer,
});


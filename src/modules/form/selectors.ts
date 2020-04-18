import { RootState } from '../rootReducer';
import { ProductState } from './reducer';

export const selectProductList = (state: RootState): ProductState['list'] => state.product.list;
export const selectProductDetail = (state: RootState): ProductState['detail'] => state.product.detail;

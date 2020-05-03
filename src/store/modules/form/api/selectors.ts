import { RootState } from '../../../rootReducer';
import { FormApiState } from './reducer';

export const selectInputForm = (state: RootState): FormApiState['data'] => state.formApi.data;

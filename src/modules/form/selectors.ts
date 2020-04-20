import { RootState } from '../rootReducer';
import {  FormInputState } from './reducer';

export const selectInputForm = (state: RootState): FormInputState['data'] => state.formInput.data;

import { RootState } from '../rootReducer';
import {  FormState } from './reducer';

export const selectInputForm = (state: RootState): FormState['inputForm'] => state.form.inputForm;

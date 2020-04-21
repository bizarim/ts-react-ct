import { RootState } from '../rootReducer';
import { FormModalState } from './reducer';
import { eFormType } from '../../constants';
import { selectInputForm } from '../form';
import { OutputFormItem } from '../types';
import { FormModalError } from './types';

export const selectAnswers = (state: RootState): FormModalState['answers'] => state.formModal.answers;
export const selectCurStep = (state: RootState): FormModalState['curStep'] => state.formModal.curStep;
export const selectMaxStep = (state: RootState): number => state.formInput.data.items.length;

export const IsFirstStep = (state: RootState): boolean => {
    const cur = selectCurStep(state);
    if (cur <= 0) return true;
    return false;
};

export const IsSubmitStep = (state: RootState): boolean => {
    const cur = selectCurStep(state);
    const max = selectMaxStep(state);
    if (max <= cur) return true;
    return false;
};

export const getProgressStep = (state: RootState): number => {
    const cur = selectCurStep(state);
    const max = selectMaxStep(state);
    if (max <= 0 || cur <= 0) return 0;
    return cur / max * 100;
};

export const getCurFormType = (state: RootState): eFormType => {
    const data = selectInputForm(state);
    const cur = selectCurStep(state);
    // todo 개선
    if (data.items.length <= 0) return eFormType.None;
    if (data.items.length <= cur) return eFormType.None;
    return data.items[cur].formType;
};

export const selectModalError = (state: RootState): FormModalError | undefined => {
    const cur = selectCurStep(state);
    return state.formModal.errors.get(cur);
};

export const getAnswer = (state: RootState): Map<number, OutputFormItem> | undefined => state.formModal.answers.get(getCurFormType(state));
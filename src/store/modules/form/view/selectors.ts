import { RootState } from '../../../rootReducer';
import { FormViewState } from './reducer';
import { OutputFormItem, FormOutputSummitPayload } from '../types';
import { FormViewError, ItemId, FormId, OptionId } from './types';
import { eFormType } from '../../../../constants';
import { selectInputForm } from '../api/selectors';

export const selectAnswers = (state: RootState): FormViewState['answers'] => state.formView.answers;
export const selectCurStep = (state: RootState): FormViewState['curStep'] => state.formView.curStep;
export const selectMaxStep = (state: RootState): number => state.formApi.data.items.length;
export const isCompleted = (state: RootState): boolean => state.formView.isCompleted;
export const isFirstStep = (state: RootState): boolean => {
    const cur = selectCurStep(state);
    if (cur <= 0) return true;
    return false;
};

export const isSubmitStep = (state: RootState): boolean => {
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

export const getFormItemId = (state: RootState): ItemId => {
    const data = selectInputForm(state);
    const cur = selectCurStep(state);
    if (data.items.length <= 0) return 0;
    if (data.items.length <= cur) return 0;
    return data.items[cur].itemId;
};

export const getFormId = (state: RootState): FormId => {
    const data = selectInputForm(state);
    return data.formId;
};

export const selectViewError = (state: RootState): FormViewError | undefined => {
    const cur = selectCurStep(state);
    return state.formView.errors.get(cur);
};

export const getAnswer = (state: RootState): Map<OptionId, OutputFormItem> | undefined => state.formView.answers.get(getCurFormType(state));
export const getAnswers = (state: RootState): Map<ItemId, Map<OptionId, OutputFormItem>> => state.formView.answers;


export const makeAnswerToApi = (state: RootState): FormOutputSummitPayload => {

    const formId = getFormId(state);
    const ansers = getAnswers(state);

    const result: FormOutputSummitPayload = {
        id: formId,
        items: [],
    };

    for (const [itemId, node] of ansers) {
        result.items.push({
            id: itemId,
            answer: [...node.values()].map((value) => value.answer).join(','),
        });
    }

    return result;
};

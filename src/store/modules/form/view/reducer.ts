import { FormViewAction } from './actions';
import { FORM_VIEW_CHECKBOX_CHECKED, FORM_VIEW_SUBMIT_PROGRESSED, FORM_VIEW_SUBMIT_COMPLETED, FORM_VIEW_INITIALIZE, FORM_VIEW_SUBMIT_ERROR, FORM_VIEW_RADIO_CHECKED, FORM_VIEW_TEXT_INPUT, FORM_VIEW_SELECTBOX_SELECTED } from './constants';
import { OutputFormItem } from '../api/types';
import { FormViewError, OptionId, ItemId, FormId } from './types';
import { eProgress } from '../../../../constants';

export interface FormViewState {
    isCompleted: boolean;
    formId: FormId;
    curStep: number;
    errors: Map<ItemId, FormViewError>;
    answers: Map<ItemId, Map<OptionId, OutputFormItem>>;
}

export const initialState: FormViewState = {
    isCompleted: false,
    formId: 0,
    curStep: 0,
    answers: new Map<ItemId, Map<OptionId, OutputFormItem>>(),
    errors: new Map<ItemId, FormViewError>(),
};

const setError = (state: FormViewState, itemId: ItemId, isError: boolean) => {
    const error = state.errors.get(state.curStep);
    if (!error) state.errors.delete(state.curStep);
    state.errors.set(state.curStep, { isError: isError, itemId: itemId });
};

// todo 로직코드 개선
export const formViewReducer = (state = initialState, action: FormViewAction): FormViewState => {

    switch (action.type) {
        case FORM_VIEW_CHECKBOX_CHECKED: {
            const { itemId, checked, output } = action.payload;
            if (undefined === state.answers.get(itemId)) {
                state.answers.set(itemId, new Map<OptionId, OutputFormItem>());
            }
            const checkboxAnswers = state.answers.get(itemId) as Map<OptionId, OutputFormItem>;
            checked ? checkboxAnswers.set(output.id, output) : checkboxAnswers.delete(output.id);
            setError(state, itemId, checkboxAnswers.size <= 0);
            return { ...state };
        }
        case FORM_VIEW_RADIO_CHECKED: {
            const { itemId, checked, output } = action.payload;
            if (undefined === state.answers.get(itemId)) {
                state.answers.set(itemId, new Map<OptionId, OutputFormItem>());
            }
            setError(state, itemId, false);
            const radioAnswers = state.answers.get(itemId) as Map<OptionId, OutputFormItem>;
            radioAnswers.clear();
            if (checked) radioAnswers.set(output.id, output);

            return {
                ...state,
            };
        }
        case FORM_VIEW_SELECTBOX_SELECTED: {
            const { itemId, output } = action.payload;
            if (undefined === state.answers.get(itemId)) {
                state.answers.set(itemId, new Map<OptionId, OutputFormItem>());
            }
            setError(state, itemId, false);
            const selectAnswers = state.answers.get(itemId) as Map<OptionId, OutputFormItem>;
            selectAnswers.clear();
            selectAnswers.set(output.id, output);
            return {
                ...state,
            };
        }
        case FORM_VIEW_TEXT_INPUT: {
            const { itemId, output } = action.payload;
            if (undefined === state.answers.get(itemId)) {
                state.answers.set(itemId, new Map<OptionId, OutputFormItem>());
            }
            const radioAnswers = state.answers.get(itemId) as Map<OptionId, OutputFormItem>;
            radioAnswers.clear();
            if (output.answer.length > 0) radioAnswers.set(output.id, output);
            setError(state, itemId, radioAnswers.size <= 0);
            return { ...state };
        }
        case FORM_VIEW_SUBMIT_PROGRESSED:
            const { progress } = action.payload;
            let curStep = state.curStep;
            progress === eProgress.previous ? curStep -= 1 : curStep += 1;
            return {
                ...state,
                curStep: curStep < 0 ? 0 : curStep,
            };
        case FORM_VIEW_INITIALIZE:
            state = {
                isCompleted: false,
                formId: action.payload.formId,
                curStep: 0,
                answers: new Map<ItemId, Map<OptionId, OutputFormItem>>(),
                errors: new Map<number, FormViewError>(),
            };
            return { ...state };
        case FORM_VIEW_SUBMIT_ERROR: {
            setError(state, action.payload.itemId, action.payload.isError);
            return { ...state };
        }
        case FORM_VIEW_SUBMIT_COMPLETED:
            state.isCompleted = true;
            return { ...state };
        default:
            return state;
    }
};

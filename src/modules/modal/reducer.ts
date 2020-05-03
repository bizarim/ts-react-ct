import { FormModalAction } from './actions';
import { FORM_MODAL_CHECKBOX_CHECKED, FORM_MODAL_SUBMIT_PROGRESSED, FORM_MODAL_SUBMIT_COMPLETED, FORM_MODAL_INITIALIZE, FORM_MODAL_SUBMIT_ERROR, FORM_MODAL_RADIO_CHECKED, FORM_MODAL_TEXT_INPUT, FORM_MODAL_SELECTBOX_SELECTED } from './constants';
import { OutputFormItem } from '../form/types';
import { eProgress } from '../../constants';
import { FormModalError, OptionId, ItemId, FormId } from './types';

export interface FormModalState {
    isCompleted: boolean;
    formId: FormId;
    curStep: number;
    errors: Map<ItemId, FormModalError>;
    answers: Map<ItemId, Map<OptionId, OutputFormItem>>;
}

export const initialState: FormModalState = {
    isCompleted: false,
    formId: 0,
    curStep: 0,
    answers: new Map<ItemId, Map<OptionId, OutputFormItem>>(),
    errors: new Map<ItemId, FormModalError>(),
};

const setError = (state: FormModalState, itemId: ItemId, isError: boolean) => {
    const error = state.errors.get(state.curStep);
    if (!error) state.errors.delete(state.curStep);
    state.errors.set(state.curStep, { isError: isError, itemId: itemId });
};

// todo 로직코드 개선
export const formModalReducer = (state = initialState, action: FormModalAction): FormModalState => {

    switch (action.type) {
        case FORM_MODAL_CHECKBOX_CHECKED: {
            const { itemId, checked, output } = action.payload;
            if (undefined === state.answers.get(itemId)) {
                state.answers.set(itemId, new Map<OptionId, OutputFormItem>());
            }
            const checkboxAnswers = state.answers.get(itemId) as Map<OptionId, OutputFormItem>;
            checked ? checkboxAnswers.set(output.id, output) : checkboxAnswers.delete(output.id);
            setError(state, itemId, checkboxAnswers.size <= 0);
            return { ...state };
        }
        case FORM_MODAL_RADIO_CHECKED: {
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
        case FORM_MODAL_SELECTBOX_SELECTED: {
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
        case FORM_MODAL_TEXT_INPUT: {
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
        case FORM_MODAL_SUBMIT_PROGRESSED:
            const { progress } = action.payload;
            let curStep = state.curStep;
            progress === eProgress.previous ? curStep -= 1 : curStep += 1;
            return {
                ...state,
                curStep: curStep < 0 ? 0 : curStep,
            };
        case FORM_MODAL_INITIALIZE:
            state = {
                isCompleted: false,
                formId: action.payload.formId,
                curStep: 0,
                answers: new Map<ItemId, Map<OptionId, OutputFormItem>>(),
                errors: new Map<number, FormModalError>(),
            };
            return { ...state };
        case FORM_MODAL_SUBMIT_ERROR: {
            setError(state, action.payload.itemId, action.payload.isError);
            return { ...state };
        }
        case FORM_MODAL_SUBMIT_COMPLETED:
            state.isCompleted = true;
            return { ...state };
        default:
            return state;
    }
};

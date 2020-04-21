import { FormModalAction } from './actions';
import { FORM_MODAL_CHECKBOX_CHECKED, FORM_MODAL_SUBMIT_PROGRESSED, FORM_MODAL_SUBMIT_COMPLETED, FORM_MODAL_INITIALIZE, FORM_MODAL_SUBMIT_ERROR, FORM_MODAL_RADIO_CHECKED, FORM_MODAL_TEXT_INPUT } from './constants';
import { OutputFormItem } from '../form/types';
import { eFormType, eProgress } from '../../constants';
import { FormModalError } from './types';

export interface FormModalState {
    curStep: number;
    error?: FormModalError;
    answers: Map<eFormType, Map<number, OutputFormItem>>;
}

export const initialState: FormModalState = {
    curStep: 0,
    answers: new Map<eFormType, Map<number, OutputFormItem>>(),
    error: { never: true, formType: eFormType.None },
};

export const formModalReducer = (state = initialState, action: FormModalAction): FormModalState => {

    switch (action.type) {
        case FORM_MODAL_CHECKBOX_CHECKED: {
            const { formType, checked, output } = action.payload;
            if (undefined === state.answers.get(formType)) {
                state.answers.set(formType, new Map<number, OutputFormItem>());
            }
            const checkboxAnswers = state.answers.get(formType) as Map<number, OutputFormItem>;
            checked ? checkboxAnswers.set(output.id, output) : checkboxAnswers.delete(output.id);
            return {
                ...state,
                error: checkboxAnswers.size !== 0 ? undefined : { never: false, formType: formType },
            };
        }
        case FORM_MODAL_RADIO_CHECKED: {
            const { formType, checked, output } = action.payload;
            if (undefined === state.answers.get(formType)) {
                state.answers.set(formType, new Map<number, OutputFormItem>());
            }
            const radioAnswers = state.answers.get(formType) as Map<number, OutputFormItem>;
            radioAnswers.clear();
            if (checked) radioAnswers.set(output.id, output);

            return {
                ...state,
                error: radioAnswers.size !== 0 ? undefined : { never: false, formType: formType },
            };
        }
        case FORM_MODAL_TEXT_INPUT: {
            const { formType, output } = action.payload;
            if (undefined === state.answers.get(formType)) {
                state.answers.set(formType, new Map<number, OutputFormItem>());
            }
            const radioAnswers = state.answers.get(formType) as Map<number, OutputFormItem>;
            radioAnswers.clear();
            radioAnswers.set(output.id, output);

            return {
                ...state,
                error: radioAnswers.size !== 0 ? undefined : { never: false, formType: formType },
            };
        }
        case FORM_MODAL_SUBMIT_PROGRESSED:
            const { progress } = action.payload;
            let curStep = state.curStep;
            progress === eProgress.previous ? curStep -= 1 : curStep += 1;
            return {
                ...state,
                curStep: curStep < 0 ? 0 : curStep,
            };
        case FORM_MODAL_SUBMIT_COMPLETED:
            return { ...state };
        case FORM_MODAL_INITIALIZE:
            state = { curStep: 0, answers: new Map<eFormType, Map<number, OutputFormItem>>(), error: undefined };
            return { ...state };
        case FORM_MODAL_SUBMIT_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};

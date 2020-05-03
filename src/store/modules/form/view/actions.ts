import {
    FORM_VIEW_CHECKBOX_CHECKED,
    FORM_VIEW_SUBMIT_PROGRESSED,
    FORM_VIEW_SUBMIT_COMPLETED,
    FORM_VIEW_INITIALIZE,
    FORM_VIEW_SUBMIT_ERROR,
    FORM_VIEW_RADIO_CHECKED,
    FORM_VIEW_TEXT_INPUT,
    FORM_VIEW_SELECTBOX_SELECTED,
} from './constants';
import { eProgress } from '../../../../constants';
import { OutputFormItem } from '../api/types';
import { FormViewError, ItemId, FormId } from './types';

export interface FormViewAnswerPayload {
    itemId: ItemId;
    checked: boolean;
    output: OutputFormItem;
}

export interface FormViewCheckboxChecked {
    type: typeof FORM_VIEW_CHECKBOX_CHECKED;
    payload: FormViewAnswerPayload;
}

export interface FormViewSubmitProgressed {
    type: typeof FORM_VIEW_SUBMIT_PROGRESSED;
    payload: {
        progress: eProgress;
    };
}
export interface FormViewSubmitCompleted {
    type: typeof FORM_VIEW_SUBMIT_COMPLETED;
    payload: {

    };
}
export interface FormViewInitailize {
    type: typeof FORM_VIEW_INITIALIZE;
    payload: {
        formId: FormId;
    };
}
export interface FormViewSubmitError {
    type: typeof FORM_VIEW_SUBMIT_ERROR;
    payload: FormViewError;
}


export interface FormViewRadioChecked {
    type: typeof FORM_VIEW_RADIO_CHECKED;
    payload: FormViewAnswerPayload;
}

export interface FormViewTextInput {
    type: typeof FORM_VIEW_TEXT_INPUT;
    payload: FormViewAnswerPayload;
}

export interface FormViewSelectboxSelected {
    type: typeof FORM_VIEW_SELECTBOX_SELECTED;
    payload: FormViewAnswerPayload;
}
export type FormViewAction
    = FormViewCheckboxChecked
    | FormViewSubmitProgressed
    | FormViewSubmitCompleted
    | FormViewInitailize
    | FormViewSubmitError
    | FormViewRadioChecked
    | FormViewTextInput
    | FormViewSelectboxSelected;

export const formViewCheckboxChecked = (payload: FormViewCheckboxChecked['payload']): FormViewCheckboxChecked => ({
    type: FORM_VIEW_CHECKBOX_CHECKED,
    payload,
});

export const formViewSubmitProgressed = (payload: FormViewSubmitProgressed['payload']): FormViewSubmitProgressed => ({
    type: FORM_VIEW_SUBMIT_PROGRESSED,
    payload,
});

export const formViewSubmitCompleted = (payload: FormViewSubmitCompleted['payload']): FormViewSubmitCompleted => ({
    type: FORM_VIEW_SUBMIT_COMPLETED,
    payload,
});

export const formViewInitailize = (payload: FormViewInitailize['payload']): FormViewInitailize => ({
    type: FORM_VIEW_INITIALIZE,
    payload,
});

export const formViewSubmitError = (payload: FormViewSubmitError['payload']): FormViewSubmitError => ({
    type: FORM_VIEW_SUBMIT_ERROR,
    payload,
});


export const formViewRadioChecked = (payload: FormViewRadioChecked['payload']): FormViewRadioChecked => ({
    type: FORM_VIEW_RADIO_CHECKED,
    payload,
});

export const formViewTextInput = (payload: FormViewTextInput['payload']): FormViewTextInput => ({
    type: FORM_VIEW_TEXT_INPUT,
    payload,
});

export const formViewSelectboxSelected = (payload: FormViewSelectboxSelected['payload']): FormViewSelectboxSelected => ({
    type: FORM_VIEW_SELECTBOX_SELECTED,
    payload,
});
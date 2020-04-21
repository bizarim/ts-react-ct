import {
    FORM_MODAL_CHECKBOX_CHECKED,
    FORM_MODAL_SUBMIT_PROGRESSED,
    FORM_MODAL_SUBMIT_COMPLETED,
    FORM_MODAL_INITIALIZE,
    FORM_MODAL_SUBMIT_ERROR,
    FORM_MODAL_RADIO_CHECKED,
    FORM_MODAL_TEXT_INPUT,
    FORM_MODAL_SELECTBOX_SELECTED,
} from './constants';
import { eProgress } from '../../constants';
import { OutputFormItem } from '../form/types';
import { FormModalError, ItemId } from './types';

export interface FormModalAnswerPayload {
    itemId: ItemId;
    checked: boolean;
    output: OutputFormItem;
}

export interface FormModalCheckboxChecked {
    type: typeof FORM_MODAL_CHECKBOX_CHECKED;
    payload: FormModalAnswerPayload;
}

export interface FormModalSubmitProgressed {
    type: typeof FORM_MODAL_SUBMIT_PROGRESSED;
    payload: {
        progress: eProgress;
    };
}
export interface FormModalSubmitCompleted {
    type: typeof FORM_MODAL_SUBMIT_COMPLETED;
    payload: {

    };
}
export interface FormModalInitailize {
    type: typeof FORM_MODAL_INITIALIZE;
}
export interface FormModalSubmitError {
    type: typeof FORM_MODAL_SUBMIT_ERROR;
    payload: FormModalError;
}


export interface FormModalRadioChecked {
    type: typeof FORM_MODAL_RADIO_CHECKED;
    payload: FormModalAnswerPayload;
}

export interface FormModalTextInput {
    type: typeof FORM_MODAL_TEXT_INPUT;
    payload: FormModalAnswerPayload;
}

export interface FormModalSelectboxSelected {
    type: typeof FORM_MODAL_SELECTBOX_SELECTED;
    payload: FormModalAnswerPayload;
}
export type FormModalAction
    = FormModalCheckboxChecked
    | FormModalSubmitProgressed
    | FormModalSubmitCompleted
    | FormModalInitailize
    | FormModalSubmitError
    | FormModalRadioChecked
    | FormModalTextInput
    | FormModalSelectboxSelected;

export const formModalCheckboxChecked = (payload: FormModalCheckboxChecked['payload']): FormModalCheckboxChecked => ({
    type: FORM_MODAL_CHECKBOX_CHECKED,
    payload,
});

export const formModalSubmitProgressed = (payload: FormModalSubmitProgressed['payload']): FormModalSubmitProgressed => ({
    type: FORM_MODAL_SUBMIT_PROGRESSED,
    payload,
});

export const formModalSubmitCompleted = (payload: FormModalSubmitCompleted['payload']): FormModalSubmitCompleted => ({
    type: FORM_MODAL_SUBMIT_COMPLETED,
    payload,
});

export const formModalInitailize = (): FormModalInitailize => ({
    type: FORM_MODAL_INITIALIZE,
});

export const formModalSubmitError = (payload: FormModalSubmitError['payload']): FormModalSubmitError => ({
    type: FORM_MODAL_SUBMIT_ERROR,
    payload,
});


export const formModalRadioChecked = (payload: FormModalRadioChecked['payload']): FormModalRadioChecked => ({
    type: FORM_MODAL_RADIO_CHECKED,
    payload,
});

export const formModalTextInput = (payload: FormModalTextInput['payload']): FormModalTextInput => ({
    type: FORM_MODAL_TEXT_INPUT,
    payload,
});

export const formModalSelectboxSelected = (payload: FormModalSelectboxSelected['payload']): FormModalSelectboxSelected => ({
    type: FORM_MODAL_SELECTBOX_SELECTED,
    payload,
});
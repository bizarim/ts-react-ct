import {
    FORM_MODAL_CHECKBOX_CHECKED,
    FORM_MODAL_SUBMIT_PROGRESSED,
    FORM_MODAL_SUBMIT_COMPLETED,
    FORM_MODAL_INITIALIZE,
    FORM_MODAL_SUBMIT_ERROR,
    FORM_MODAL_RADIO_CHECKED,
} from './constants';
import { eFormType, eProgress } from '../../constants';
import { OutputFormItem } from '../form/types';

export interface FormModalAnswerPayload {
    formType: eFormType;
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
    payload: {
        never: boolean,
        formType: eFormType,
        text?: string,
    };
}


export interface FormModalRadioChecked {
    type: typeof FORM_MODAL_RADIO_CHECKED;
    payload: FormModalAnswerPayload;
}
export type FormModalAction
    = FormModalCheckboxChecked
    | FormModalSubmitProgressed
    | FormModalSubmitCompleted
    | FormModalInitailize
    | FormModalSubmitError
    | FormModalRadioChecked;

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
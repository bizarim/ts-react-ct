import {
    FORM_OUTPUT_SUMMIT_ERR,
    FORM_OUTPUT_SUMMIT_REQ,
    FORM_OUTPUT_SUMMIT_RES,
    FORM_INPUT_GET_LIST_ERR,
    FORM_INPUT_GET_LIST_REQ,
    FORM_INPUT_GET_LIST_RES,
} from './constants';
import { FormInputGetListPayload, FormOutputSummitPayload, CommonErrorPayload } from './types';

export interface FormOutputSummitErr {
    type: typeof FORM_OUTPUT_SUMMIT_ERR;
    payload: CommonErrorPayload;
}
export interface FormOutputSummitReq {
    type: typeof FORM_OUTPUT_SUMMIT_REQ;
    payload: FormOutputSummitPayload;
}
export interface FormOutputSummitRes {
    type: typeof FORM_OUTPUT_SUMMIT_RES;
}


export interface FormInputGetListErr {
    type: typeof FORM_INPUT_GET_LIST_ERR;
    payload: CommonErrorPayload;
}
export interface FormInputGetListReq {
    type: typeof FORM_INPUT_GET_LIST_REQ;
}
export interface FormInputGetListRes {
    type: typeof FORM_INPUT_GET_LIST_RES;
    payload: FormInputGetListPayload;
}
export type FormAction = FormOutputSummitErr
    | FormOutputSummitReq
    | FormOutputSummitRes
    | FormInputGetListErr
    | FormInputGetListReq
    | FormInputGetListRes;

export const formOutputSummitErr = (payload: FormOutputSummitErr['payload']): FormOutputSummitErr => ({
    type: FORM_OUTPUT_SUMMIT_ERR,
    payload,
});
export const formOutputSummitReq = (payload: FormOutputSummitReq['payload']): FormOutputSummitReq => ({
    type: FORM_OUTPUT_SUMMIT_REQ,
    payload,
});
export const formOutputSummitRes = (): FormOutputSummitRes => ({
    type: FORM_OUTPUT_SUMMIT_RES,
});

export const formInputGetListErr = (payload: FormInputGetListErr['payload']): FormInputGetListErr => ({
    type: FORM_INPUT_GET_LIST_ERR,
    payload,
});
export const formInputGetListReq = (): FormInputGetListReq => ({
    type: FORM_INPUT_GET_LIST_REQ,
});
export const formInputGetListRes = (payload: FormInputGetListRes['payload']): FormInputGetListRes => ({
    type: FORM_INPUT_GET_LIST_RES,
    payload,
});

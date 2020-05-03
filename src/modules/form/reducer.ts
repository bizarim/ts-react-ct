import { CommonErrorPayload, InputForm } from './types';
import { FormAction } from './actions';
import {
    FORM_OUTPUT_SUMMIT_ERR,
    FORM_OUTPUT_SUMMIT_REQ,
    FORM_OUTPUT_SUMMIT_RES,
    FORM_INPUT_GET_LIST_ERR,
    FORM_INPUT_GET_LIST_REQ,
    FORM_INPUT_GET_LIST_RES,
} from './constants';

export interface FormInputState {
    data: InputForm;
    error?: CommonErrorPayload;
}

export const initialState: FormInputState = {
    data: {
        formId: 0,
        title: '',
        items: [],
    },
};

export const formInputReducer = (state = initialState, action: FormAction): FormInputState => {

    switch (action.type) {
        case FORM_OUTPUT_SUMMIT_ERR:
            return {
                ...state,
                error: action.payload,
            };
        case FORM_OUTPUT_SUMMIT_REQ:
            return {
                ...state,
                error: undefined,
            };
        case FORM_OUTPUT_SUMMIT_RES:
            return {
                ...state,
                error: undefined,
            };
        case FORM_INPUT_GET_LIST_ERR:
            return {
                ...state,
                error: action.payload,
            };
        case FORM_INPUT_GET_LIST_REQ:
            return {
                ...state,
            };
        case FORM_INPUT_GET_LIST_RES:
            return {
                ...state,
                error: undefined,
                data: action.payload,
            };
        default:
            return state;
    }
};

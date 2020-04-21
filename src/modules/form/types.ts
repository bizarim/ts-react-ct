import { IPayload } from '../../api';
import { eFormType } from '../../constants';

export interface CommonErrorPayload {
    code: string;
    msg: string;
}

export interface InputForm {
    formId: number;
    title: string;
    items: InputFormItem[];
}

export interface InputFormItem {
    itemId: number;
    title: string;
    formType: eFormType;
    options: InputFormItemOption[];
}

export interface InputFormItemOption {
    id: number;
    text: string;
}

export interface FormInputGetListPayload extends IPayload {
    formId: number;
    title: string;
    items: InputFormItem[];
}

export interface OutputFormItem {
    id: number;
    answer: string;
}

export interface FormOutputSummitPayload extends IPayload {
    id: number;
    items: OutputFormItem[];
}
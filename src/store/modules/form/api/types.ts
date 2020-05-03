import { FormId, ItemId } from '../view/types';
import { eFormType } from '../../../../constants';
import { IPayload } from '../../../../api';

export interface CommonErrorPayload {
    code: string;
    msg: string;
}

export interface InputForm {
    formId: FormId;
    title: string;
    items: InputFormItem[];
}

export interface InputFormItem {
    itemId: ItemId;
    title: string;
    formType: eFormType;
    options: InputFormItemOption[];
}

export interface InputFormItemOption {
    id: number;
    text: string;
}

export interface FormInputGetListPayload extends IPayload {
    formId: FormId;
    title: string;
    items: InputFormItem[];
}

export interface OutputFormItem {
    id: ItemId;
    answer: string;
}

export interface FormOutputSummitPayload extends IPayload {
    id: FormId;
    items: OutputFormItem[];
}
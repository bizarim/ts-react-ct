import { eFormType } from '../../constants';

export type FormId = number;
export type ItemId = number;
export type OptionId = number;

export interface FormModalError {
    isError: boolean;
    itemId: ItemId;
}

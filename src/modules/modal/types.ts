import { eFormType } from '../../constants';


export interface FormModalError {
    never: boolean;
    formType: eFormType;
    text?: string;
}

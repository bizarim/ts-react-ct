import React from 'react';
import { Selectbox } from '../../base/selectbox/Selectbox';
import { eFormType } from '../../../constants';
import { InputFormItem, OutputFormItem } from '../../../modules/types';
import { FormModalAnswerPayload } from '../../../modules/modal/actions';

interface Props {
    formType: eFormType;
    formData: InputFormItem;
    answer: Map<number, OutputFormItem> | undefined;
    onChecked(payload: FormModalAnswerPayload): any;
}
interface State {

}

export class ModalSelectbox extends React.Component<Props, State> {
    public state = {};

    public render() {
        const { formData } = this.props;
        return (
            <div className="modal-form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <div className="form-group">
                        <Selectbox options={formData.options} onHandle={this.onHandle}/>
                    </div>
                </div>
            </div>
        );
    }

    private onHandle = (id: number, checked: boolean, text: string) => {
        // const { formType, onChecked } = this.props;
        // onChecked({ formType: formType, checked: checked, output: { id: id, answer: text } });
        // tslint:disable-next-line:no-console
        console.log('test' + id + checked);
    }
}
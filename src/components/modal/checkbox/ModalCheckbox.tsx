import React from 'react';
import { Checkbox } from '../..';
import { InputFormItem, OutputFormItem } from '../../../modules/types';
import { FormModalAnswerPayload } from '../../../modules/modal/actions';
import { eFormType } from '../../../constants';

interface Props {
    formType: eFormType;
    formData: InputFormItem;
    answer: Map<number, OutputFormItem> | undefined;
    onChecked(payload: FormModalAnswerPayload): any;
}
interface State {

}

export class ModalCheckbox extends React.Component<Props, State> {
    public state = {};

    public render() {
        const { formData, answer } = this.props;
        const list = answer ? answer : new Map<number, OutputFormItem>();
        return (
            <div className="modal-form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <ul>
                        {formData.options.map((option, index) => {
                            return (
                                <li key={index} className="item-list">
                                    <Checkbox id={option.id} init={list.get(option.id) ? true : false} text={option.text} onHandle={this.onHandle} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }

    private onHandle = (id: number, checked: boolean, text: string) => {
        const { formType, onChecked } = this.props;
        onChecked({ formType: formType, checked: checked, output: { id: id, answer: text } });
        // tslint:disable-next-line:no-console
        console.log('test' + id + checked);
    }
}
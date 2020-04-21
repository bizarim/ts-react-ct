import React from 'react';
import { TextInput } from '../..';
import { eFormType } from '../../../constants';
import { InputFormItem, OutputFormItem } from '../../../modules/types';
import { FormModalAnswerPayload } from '../../../modules/modal/actions';

interface Props {
    formType: eFormType;
    formData: InputFormItem;
    answer: Map<number, OutputFormItem> | undefined;
    onChanged(payload: FormModalAnswerPayload): any;
}
interface State {

}

export class ModalTextInput extends React.Component<Props, State> {
    public state = {};
    public render() {
        const { formData, answer } = this.props;
        const list = answer ? answer : new Map<number, OutputFormItem>();
        const id = 0;
        const text = list.get(id)?.answer;
        return (
            <div className="modal-form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <TextInput
                        placeHolder={'입력해주세요.'}
                        id={id}
                        text={text ? text : ''}
                        onHandle={this.onHandle} />
                </div>
            </div>
        );
    }

    private onHandle = (id: number, checked: boolean, text: string) => {
        const { formType, onChanged } = this.props;
        onChanged({ formType: formType, checked: checked, output: { id: id, answer: text } });
        // tslint:disable-next-line:no-console
        console.log('test:' + text);
    }
}
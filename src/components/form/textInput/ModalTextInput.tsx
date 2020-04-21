import React from 'react';
import { TextInput } from '../..';
import { InputFormItem, OutputFormItem } from '../../../modules/types';
import { FormModalAnswerPayload } from '../../../modules/modal/actions';
import { ItemId } from '../../../modules/modal/types';

interface Props {
    formData: InputFormItem;
    answer: Map<ItemId, OutputFormItem> | undefined;
    onTextInput(payload: FormModalAnswerPayload): any;
}
interface State {

}

export class ModalTextInput extends React.Component<Props, State> {
    public state = {};
    public render() {
        const { formData, answer } = this.props;
        const list = answer ? answer : new Map<ItemId, OutputFormItem>();
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
        const { formData, onTextInput } = this.props;
        onTextInput({ itemId: formData.itemId, checked: checked, output: { id: id, answer: text } });
    }
}
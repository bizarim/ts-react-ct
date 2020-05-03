import React from 'react';
import { TextInput } from '../..';
import { InputFormItem, ItemId, OutputFormItem } from '../../../store/modules/form/types';
import { FormViewAnswerPayload } from '../../../store/modules/form/view/actions';


interface Props {
    formData: InputFormItem;
    answer: Map<ItemId, OutputFormItem> | undefined;
    onTextInput(payload: FormViewAnswerPayload): any;
}
interface State {

}

// todo 언어설정
const placeHolder = '입력해주세요';

export class FormTextInput extends React.Component<Props, State> {
    public state = {};
    public render() {
        const { formData, answer } = this.props;
        const list = answer ? answer : new Map<ItemId, OutputFormItem>();
        const id = 0;
        const text = list.get(id)?.answer;
        return (
            <div className="form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <TextInput
                        placeHolder={placeHolder}
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
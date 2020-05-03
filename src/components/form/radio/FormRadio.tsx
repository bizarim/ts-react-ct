import React from 'react';
import { Radio } from '../../base/radio/Radio';
import { InputFormItem, OutputFormItem } from '../../../store/modules/form/types';
import { FormViewAnswerPayload } from '../../../store/modules/form/view/actions';

interface Props {
    formData: InputFormItem;
    answer: Map<number, OutputFormItem> | undefined;
    onChecked(payload: FormViewAnswerPayload): any;
}
interface State {
    selectedId: string;
}

export class FormRadio extends React.Component<Props, State> {
    public state = {
        selectedId: '',
    };

    public render() {
        const { formData, answer } = this.props;
        const list = answer ? answer : new Map<number, OutputFormItem>();

        return (
            <div className="form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <ul>
                        {formData.options.map((option, index) => {
                            return (
                                <li key={index} className="item-list">
                                    <Radio id={option.id} init={list.get(option.id) ? true : false} text={option.text} onHandle={this.onHandle} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
    private onHandle = (id: number, checked: boolean, text: string) => {
        const { formData, onChecked } = this.props;
        const { selectedId } = this.state;
        if (`${id}` !== selectedId) {
            onChecked({ itemId: formData.itemId, checked: checked, output: { id: id, answer: text } });
            this.setState({ selectedId: `${id}` });
        }
    }
}
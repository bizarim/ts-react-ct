import React from 'react';
import { Selectbox } from '../../base/selectbox/Selectbox';
import { InputFormItem, OutputFormItem } from '../../../store/modules/form/types';
import { FormViewAnswerPayload } from '../../../store/modules/form/view/actions';


interface Props {
    formData: InputFormItem;
    answer: Map<number, OutputFormItem> | undefined;
    onSelectboxSelected(payload: FormViewAnswerPayload): any;
}
interface State {

}

export class FormSelectbox extends React.Component<Props, State> {
    public state = {};

    public render() {
        const { formData, answer } = this.props;
        return (
            <div className="form-list" >
                <div className="request-formset">
                    <h3 >{formData.title}</h3>
                    <div className="form-group">
                        <Selectbox options={formData.options} answer={answer} onHandle={this.onHandle}/>
                    </div>
                </div>
            </div>
        );
    }

    private onHandle = (id: number, checked: boolean, text: string) => {
        const { formData, onSelectboxSelected } = this.props;
        onSelectboxSelected({ itemId: formData.itemId, checked: checked, output: { id: id, answer: text } });
    }
}
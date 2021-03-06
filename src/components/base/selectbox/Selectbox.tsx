import React from 'react';
import { OutputFormItem, InputFormItemOption } from '../../../store/modules/form/types';

export interface SelectboxProps {
    answer: Map<number, OutputFormItem> | undefined;
    options: InputFormItemOption[];
    onHandle(id: number, checked: boolean, text: string): void;
}
interface State {
    value: string;
}

// todo 언어설정
const disabledMsg = '선택해주세요';

export class Selectbox extends React.Component<SelectboxProps, State> {
    public state = {
        value: '',
    };

    public render() {
        const { options, answer } = this.props;
        let value = '';
        answer?.forEach(item => { value = item.answer; });

        return (
            <div className={`base-selectbox ${value === '' ? 'no-value' : ''}`}>
                <div className="select-wrapper">
                    <select className="form-control" value={value} onChange={this.handleChange}>
                        <option value="" disabled={true} >{disabledMsg}</option>
                        {options.map((option, index) => {
                            return (
                                <option key={index} id={`$option.id`} value={option.text}>{option.text}</option>
                            );
                        })}


                    </select>
                    <i className="fa arrow"></i>
                </div>
            </div>
        );
    }

    private handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { onHandle } = this.props;
        const id = event.target.id;
        const text = event.target.value;
        this.setState({ value: text });
        if (onHandle)
            onHandle(parseInt(id), false, text);
    }
}
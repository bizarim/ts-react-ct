import React from 'react';
import { InputFormItemOption } from '../../../modules/types';

interface Props {
    options: InputFormItemOption[];
    onHandle(id: number, checked: boolean, text: string): void;
}
interface State {
    value: string;
}

export class Selectbox extends React.Component<Props, State> {
    public state = {
        value: '',
    };

    public render() {
        const { options } = this.props;
        const { value } = this.state;
        return (
            <div className={`base-selectbox ${value === '' ? 'no-value' : ''}`}>
                <div className="select-wrapper">
                    <select className="form-control" value={value} onChange={this.handleChange}>
                        <option value="" disabled={true} >{'선택해주세요.'}</option>
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
        // const { id, onHandle, text } = this.props;
        const v = event.target.value;
        // tslint:disable-next-line:no-console
        console.log('test' + v);
        this.setState({ value: v });
        // if (onHandle)
        //     onHandle(id, false, text);
    }
}
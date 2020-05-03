import React from 'react';

export interface CheckboxProps {
    id: number;
    text: string;
    init: boolean;
    onHandle(id: number, checked: boolean, text: string): void;
}
interface State {
    checked: boolean;
}

export class Checkbox extends React.Component<CheckboxProps, State> {
    public state = {
        checked: this.props.init,
    };
    public render() {
        const { id, text } = this.props;
        const { checked } = this.state;
        return (
            <div id={`${id}`} className="checkbox-label">
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={this.onChange}
                    />
                    <span className="checkbox-el">
                        <span />
                    </span>

                    <span className="checkbox-body">
                        <span className="checkbox-body">
                            <p className="label-desc">{text}</p>
                        </span>
                    </span>
                </label>
            </div>
        );
    }
    private onChange = () => {
        const { id, onHandle, text } = this.props;
        const { checked } = this.state;
        this.setState({ checked: !checked });
        if (onHandle)
            onHandle(id, !checked, text);
    };
}
import React from 'react';

export interface TextInputProps {
    id: number;
    text: string;
    placeHolder: string;
    onHandle(id: number, checked: boolean, text: string): void;
}
interface State {
    value: string;
}

export class TextInput extends React.Component<TextInputProps, State> {
    public state = {
        value: this.props.text,
    };
    public render() {
        const { placeHolder } = this.props;
        const { value } = this.state;
        return (
            <input
                className="form-control"
                name="input-text"
                type="text"
                x-autocompletetype="off"
                placeholder={placeHolder}
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="true"
                minLength={0}
                maxLength={255}
                value={value}
                onChange={this.onChange}
            />
        );
    }

    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const { id, onHandle } = this.props;
        this.setState({ value: value });

        if (onHandle)
            onHandle(id, false, value);
    };
}
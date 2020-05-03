import React from 'react';

export interface RadioProps {
    id: number;
    text: string;
    init: boolean;
    onHandle(id: number, checked: boolean, text: string): void;
}
interface State {

}

export class Radio extends React.Component<RadioProps, State> {
    public state = {

    };
    public render() {
        const { id, text } = this.props;
        const  checked  = this.props.init;
        return (
            <div key={`${id}`} className="radio-label">
                <label>
                    <input id={`${id}`}
                        type="radio"
                        checked={checked}
                        onChange={this.onChange}
                    />
                    <span className="radio-el">
                        <span className="radio" />
                    </span>

                    <span className="radio-body">
                        <span className="radio-body">
                            <p className="label-desc">{text}</p>
                        </span>
                    </span>
                </label>
            </div>
        );
    }
    private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedId = e.target.id;
        const { id, onHandle, text } = this.props;
        const checked = selectedId === `${id}`;

        if (onHandle)
            onHandle(id, checked, text);
    };
}
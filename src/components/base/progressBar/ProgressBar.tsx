import React from 'react';

export interface ProgressProps {
    value: number;
}
interface State {

}

export class ProgressBar extends React.Component<ProgressProps, State> {
    public render() {
        const { value } = this.props;
        const style = {
            width: this.makeValue(value),
        };
        return (
            <div className="contents-header">
                <div className="progress">
                    <div className="progress-bar" style={style}>

                    </div>
                </div>
                <div className="progress-desc" ><p >{this.makeValue(value)}</p></div>
            </div>
        );
    }
    private makeValue(value: number): string {
        if (value < 0) value = 0;
        else if (100 < value) value = 100;

        return `${value.toFixed(0)}%`;
    }
}


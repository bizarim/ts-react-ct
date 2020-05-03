import React from 'react';

interface Props {
    formId: number;
    title: string;
}
interface State {

}

export class FormTitle extends React.Component<Props, State> {

    public render() {
        const { title } = this.props;
        return (
            <section className="form-title" no-gutters="true" >
                <div className="title-wrapper" >
                    <h1 >{title}</h1>
                </div>
                <div className="dimmed"></div>
            </section>
        );
    }
}
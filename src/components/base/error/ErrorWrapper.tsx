import React from 'react';


export class ErrorWrapper extends React.Component {
    public componentDidCatch(error: any, info: any) {
        // tslint:disable-next-line
        console.error(error);
    }

    public render() {
        return this.props.children;
    }
}

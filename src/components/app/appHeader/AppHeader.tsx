import React from 'react';

interface Props {

}
interface State {

}

export class AppHeader extends React.Component<Props, State> {
    public state = {};

    public render() {
        return (
            <div className="app-header">
                <img src={require('../../../assets/logo.svg')} alt="logo"></img>
            </div>
        );
    }
}
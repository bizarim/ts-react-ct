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
                <img src="https://dmmj3ljielax6.cloudfront.net/static/img/home/index_soomgo_logo.svg" alt="숨고, 숨은고수"></img>
            </div>
        );
    }
}
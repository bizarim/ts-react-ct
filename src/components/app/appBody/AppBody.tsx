import React from 'react';
import { Route, Switch } from 'react-router';
import { RequestForm } from '../../../page/requestForm/RequestForm';

interface Props {

}
interface State {

}

export class AppBody extends React.Component<Props, State> {
    public render() {
        return (
            <div>
                <Switch>
                    <Route path="/" component={RequestForm} />
                </Switch>
            </div>
        );
    }
}
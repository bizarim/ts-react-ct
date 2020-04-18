import React, { Component } from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { ErrorWrapper } from './components/errorWrapper/ErrorWrapper';
import { AppHeader } from './components/appHeader/AppHeader';
import { AppBody } from './components/appBody/AppBody';
import { AppFooter } from './components/appFooter/AppFooter';

const history = createBrowserHistory();


export class App extends Component {
    public state = {};

    public render() {
        return (
            <Router history={history}>
                <ErrorWrapper>
                    <AppHeader />
                    <AppBody />
                    <AppFooter />
                </ErrorWrapper>
            </Router>
        );
    }
}

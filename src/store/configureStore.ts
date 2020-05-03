import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';

// [ Redux 만들기 ] step 6: store에 rootReducer, rootSaga 등록
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger({ collapsed: true });

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        composeEnhancer(
            applyMiddleware(
                sagaMiddleware,
                logger,
                routerMiddleware(history),
            ),
        ),
    );

    sagaMiddleware.run(rootSaga);

    return store;
};

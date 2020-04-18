import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../rootSaga';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../utills/jest';
import {
    formOutputSummitErr,
    formOutputSummitReq,
    formOutputSummitRes,
} from '../actions';

describe('Module: FormOutputSummit', () => {
    let store: MockStoreEnhanced;
    let sagaMiddleware: SagaMiddleware<{}>;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        sagaMiddleware = createSagaMiddleware();
        store = setupMockStore(sagaMiddleware, false)();
        sagaMiddleware.run(rootSaga);
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeError = {
        code: '',
        msg: '',
    };

    const fakeParams = {
        id: 1, // formId
        items: [
            {
                id: 1, // itemId
                answer: '예시 답변입니다',
            }, {
                id: 2, // itemId
                answer: '답변,여러개,예시답변,입니다',  // ,pasing
            }],
    };

    const mockCooconSendCode = () => {
        mockAxios.onPost('/output').reply(200);
    };

    const expectedActionsFetch = [formOutputSummitReq(fakeParams), formOutputSummitRes()];
    const expectedActionsError = [formOutputSummitReq(fakeParams), formOutputSummitErr(fakeError)];

    it('should fetch coocon send code in success flow', async () => {
        mockCooconSendCode();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsFetch.length) {
                    expect(actions).toEqual(expectedActionsFetch);
                    resolve();
                }
            });
        });

        store.dispatch(formOutputSummitReq(fakeParams));
        return promise;
    });

    it('should trigger an error', async () => {
        mockNetworkError(mockAxios);
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsError.length) {
                    expect(actions).toEqual(expectedActionsError);
                    resolve(fakeParams);
                }
            });
        });
        store.dispatch(formOutputSummitReq(fakeParams));
        return promise;
    });
});

import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { rootSaga } from '../../rootSaga';
import { mockNetworkError, setupMockAxios, setupMockStore } from '../../../utills/jest';
import {
    formInputGetListErr,
    formInputGetListReq,
    formInputGetListRes,
} from '../actions';
import { FormInputGetListPayload } from '../types';

describe('Module: FormInputGetList', () => {
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

    const fakeResponse: FormInputGetListPayload = {
        formId: 1,
        title: '사무실 대청소 요청서 폼',
        items: [{ itemId: 1, title: '원하는 청소 스타일은 무엇인가요?', formType: 1, options: [{ id: 1, text: '스팀청소' }, { id: 2, text: '진공청소기로 청소' }, { id: 3, text: '쓰레기 비우기' }] }, { itemId: 2, title: '몇시간 청소를 원하시나요?', formType: 2, options: [{ id: 3, text: '30분' }, { id: 4, text: '1시간' }, { id: 5, text: '2시간' }] }, { itemId: 3, title: '추가로 원하시는 청소 스타일이 있나요? 직접 입력해주세요', formType: 3, options: [] }, { itemId: 4, title: '네번째 질문입니다', formType: 4, options: [{ id: 6, text: '첫번째 셀렉트박스 질문 입니다' }, { id: 7, text: '두번째 셀렉트박스 질문 입니다' }, { id: 8, text: '세번째 셀렉트박스 질문 입니다' }] }],
    };

    const mockCooconSendCode = () => {
        mockAxios.onPost('/input').reply(200);
    };

    const expectedActionsFetch = [formInputGetListReq(), formInputGetListRes(fakeResponse)];
    const expectedActionsError = [formInputGetListReq(), formInputGetListErr(fakeError)];

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

        store.dispatch(formInputGetListReq());
        return promise;
    });

    it('should trigger an error', async () => {
        mockNetworkError(mockAxios);
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsError.length) {
                    expect(actions).toEqual(expectedActionsError);
                    resolve(fakeResponse);
                }
            });
        });

        store.dispatch(formInputGetListReq());
        return promise;
    });
});

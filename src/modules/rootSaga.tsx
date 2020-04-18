import { all, call } from 'redux-saga/effects';
import { rootProductSaga } from './form';

// [ Redux 만들기 ] step 5: saga 등록
// saga 등록

// tslint:disable-next-line:no-default-export
export function* rootSaga() {
    yield all([
        call(rootProductSaga),
    ]);
}

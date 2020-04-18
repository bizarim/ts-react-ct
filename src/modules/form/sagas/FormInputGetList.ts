import { call, put } from 'redux-saga/effects';
import { API } from '../../../api';
import { FormInputGetListReq, formInputGetListRes, formInputGetListErr } from '../actions';
import { ServiceType } from '../../../constants';

export function* getFormInputGetListSaga(action: FormInputGetListReq) {
    try {
        const rs = yield call(API.get({ service: ServiceType.form }), `/input`);
        yield put(formInputGetListRes(rs));
    } catch (error) {
        yield put(formInputGetListErr(error));
    }
}

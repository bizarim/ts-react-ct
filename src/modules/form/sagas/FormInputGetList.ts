// import { call, put } from 'redux-saga/effects';
// import { API } from '../../../api';
// import { ServiceType } from '../../../constants';
import { put } from 'redux-saga/effects';
import { FormInputGetListReq, formInputGetListRes, formInputGetListErr } from '../actions';
import data from '../../../assets/input.json';

export function* getFormInputGetListSaga(action: FormInputGetListReq) {

    try {
        // todo
        // const rs = yield call(API.get({ service: ServiceType.form }), `/input`);
        // yield put(formInputGetListRes(rs));
        yield put(formInputGetListRes(data));
    } catch (error) {
        yield put(formInputGetListErr(error));
    }
}

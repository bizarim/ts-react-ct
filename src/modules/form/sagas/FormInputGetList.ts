import { call, put } from 'redux-saga/effects';
import { API } from '../../../api';
import { ServiceType } from '../../../constants';
import { FormInputGetListReq, formInputGetListRes, formInputGetListErr } from '../actions';
import data from '../../../assets/input.json';
import { formModalInitailize } from '../../modal';

export function* getFormInputGetListSaga(action: FormInputGetListReq) {

    try {
        const rs = yield call(API.get({ service: ServiceType.form }), `/input`);
        // todo
        // yield put(formInputGetListRes(rs));
        yield put(formInputGetListRes(data));
        yield(formModalInitailize({ formId: data.formId}));
    } catch (error) {
        yield put(formInputGetListErr(error));
    }
}

import { put } from 'redux-saga/effects';
import { FormInputGetListReq, formInputGetListRes, formInputGetListErr } from '../actions';
import data from '../../../assets/input.json';
import { formModalInitailize } from '../../modal';

export function* getFormInputGetListSaga(action: FormInputGetListReq) {
    try {
        // todo api 연동
        yield put(formInputGetListRes(data));
        yield(formModalInitailize({ formId: data.formId}));
    } catch (error) {
        yield put(formInputGetListErr(error));
    }
}

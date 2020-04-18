import { call, put } from 'redux-saga/effects';
import { API, ApiResponse } from '../../../api';
import { FormOutputSummitReq, formOutputSummitRes, formOutputSummitErr } from '../actions';
import { ServiceType, eErrorCode } from '../../../constants';

export function* getFormOutputSummitSaga(action: FormOutputSummitReq) {
    try {
        const rs: ApiResponse = yield call(API.post({ service: ServiceType.form }), '/output', action.payload);
        if (rs.code === '0') {
            yield put(formOutputSummitRes());
            // todo success alert popup
        } else {
            yield put(formOutputSummitErr({ code: rs.code, msg: rs.msg }));
            // todo failed alert popup
        }
    } catch (error) {
        // todo 개선
        yield put(formOutputSummitErr({ code: `${eErrorCode.UnknownError}`, msg: 'UnknownError' }));
        // todo error alert popup
    }
}

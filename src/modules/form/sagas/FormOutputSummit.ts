import { put, call } from 'redux-saga/effects';
import { FormOutputSummitReq, formOutputSummitErr } from '../actions';
import { eErrorCode, ServiceType } from '../../../constants';
import { formModalSubmitCompleted } from '../../modal';
import { ApiResponse, API } from '../../../api';

export function* getFormOutputSummitSaga(action: FormOutputSummitReq) {
    try {
        // 답변 제조합 하기


        // todo api 연동
        const rs: ApiResponse = yield call(API.post({ service: ServiceType.form }), '/output', action.payload);
        // if (rs.code === '0')yield put(formOutputSummitRes());
        // else yield put(formOutputSummitErr({ code: rs.code, msg: rs.msg }));

        yield put(formModalSubmitCompleted({}));

    } catch (error) {
        // todo 개선
        yield put(formOutputSummitErr({ code: `${eErrorCode.UnknownError}`, msg: 'UnknownError' }));
        // todo error alert popup
    }
}


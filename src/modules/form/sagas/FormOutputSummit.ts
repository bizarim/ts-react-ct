import { put } from 'redux-saga/effects';
import { FormOutputSummitReq, formOutputSummitErr } from '../actions';
import { eErrorCode } from '../../../constants';
import { formModalSubmitCompleted } from '../../modal';

export function* getFormOutputSummitSaga(action: FormOutputSummitReq) {
    try {
        // todo api 연동
        yield put(formModalSubmitCompleted({}));
    } catch (error) {
        // todo 개선
        yield put(formOutputSummitErr({ code: `${eErrorCode.UnknownError}`, msg: 'UnknownError' }));
        // todo error alert popup
    }
}


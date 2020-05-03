import { put } from 'redux-saga/effects';
import { FormOutputSummitReq, formOutputSummitErr } from '../actions';
import { eErrorCode } from '../../../../../constants';
import { formViewSubmitCompleted } from '../../view/actions';

export function* getFormOutputSummitSaga(action: FormOutputSummitReq) {
    try {
        // todo api 연동
        yield put(formViewSubmitCompleted({}));
    } catch (error) {
        // todo 개선
        yield put(formOutputSummitErr({ code: `${eErrorCode.UnknownError}`, msg: 'UnknownError' }));
        // todo error alert popup
    }
}


import { put } from 'redux-saga/effects';
import { FormOutputSummitReq, formOutputSummitErr } from '../actions';
import { eErrorCode } from '../../../constants';
import { ItemId, OptionId, FormId } from '../../modal/types';
import { OutputFormItem, FormOutputSummit } from '../types';

export function* getFormOutputSummitSaga(action: FormOutputSummitReq) {
    try {
        // 답변 제조합 하기
        const form: FormOutputSummit = makeAnswerToApi(action.payload.formId, action.payload.ansers);

        // todo api 연동
        // const rs: ApiResponse = yield call(API.post({ service: ServiceType.form }), '/output', action.payload);
        // if (rs.code === '0')yield put(formOutputSummitRes());
        // else yield put(formOutputSummitErr({ code: rs.code, msg: rs.msg }));

    } catch (error) {
        // todo 개선
        yield put(formOutputSummitErr({ code: `${eErrorCode.UnknownError}`, msg: 'UnknownError' }));
        // todo error alert popup
    }
}

const makeAnswerToApi = (formId: FormId, ansers: Map<ItemId, Map<OptionId, OutputFormItem>>): FormOutputSummit => {

    const result: FormOutputSummit = {
        id: formId,
        items: [],
    };

    for (const [itemId, node] of ansers) {
        result.items.push({
            id: itemId,
            answer: [...node.values()].map((value) => value.answer).join(','),
        });
    }

    return result;
};

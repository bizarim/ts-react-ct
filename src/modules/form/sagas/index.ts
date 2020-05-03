// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import {
    FORM_OUTPUT_SUMMIT_REQ,
    FORM_INPUT_GET_LIST_REQ,
} from '../constants';
import { getFormInputGetListSaga } from './FormInputGetList';
import { getFormOutputSummitSaga } from './FormOutputSummit';

export function* rootFormSaga() {

    yield takeEvery(FORM_INPUT_GET_LIST_REQ, getFormInputGetListSaga);
    yield takeEvery(FORM_OUTPUT_SUMMIT_REQ, getFormOutputSummitSaga);
}

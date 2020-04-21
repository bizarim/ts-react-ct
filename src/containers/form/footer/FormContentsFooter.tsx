import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { eProgress, eFormType } from '../../../constants';
import { FormModalError, ItemId, FormId, OptionId } from '../../../modules/modal/types';
import { formModalSubmitProgressed, IsSubmitStep, getCurFormType, selectModalError, IsFirstStep, FormModalAction, formModalSubmitError, getFormItemId, getFormId, getAnswers } from '../../../modules/modal';
import { RootState } from '../../../modules/rootReducer';
import { FormAction, formOutputSummitReq } from '../../../modules/form';
import { FormOutputSummitPayload, OutputFormItem } from '../../../modules/types';

interface ReduxProps {
    isFirst: boolean;
    isSubmit: boolean;
    formType: eFormType;
    error?: FormModalError;
    itemId: ItemId;
    formId: FormId;
    answers: Map<ItemId, Map<OptionId, OutputFormItem>>;
}
interface DispatchPros {
    onProgressed: typeof formModalSubmitProgressed;
    onError: typeof formModalSubmitError;
    formOutputSummitReq: typeof formOutputSummitReq;
}
type Props = ReduxProps & DispatchPros;

// todo 언어설정
const previousBtn = '이전';
const nextBtn = '다음';
const submitBtn = '요청 보내기';

class Footer extends React.Component<Props> {

    public render() {
        const { isFirst, isSubmit, error, formType } = this.props;
        return (
            <div className="contents-footer">
                <small className="form-error-msg">
                    {error ? error.isError ? <i className="fa notice"> {this.getErrorMessage(formType)} </i> : null : null}
                </small>
                <div className="btn-wrapper">
                    {isFirst
                        ? null
                        : <button className="btn neg-btn-primary" onClick={this.onPreviousClicked}> {previousBtn} </button>}
                    {isSubmit
                        ? <button className="btn btn-primary" onClick={this.onSubmit}> {submitBtn} </button>
                        : <button className="btn btn-primary" onClick={this.onNextClicked}> {nextBtn} </button>}
                </div>
            </div>
        );
    }

    private getErrorMessage = (formType: eFormType): string => {
        // todo 언어설정
        switch (formType) {
            case eFormType.Checkbox: return '선택해 주세요.!';
            case eFormType.Radio: return '선택해 주세요.!';
            case eFormType.Selectbox: return '선택해 주세요!';
            case eFormType.TextInput: return '빈칸을 입력해 주세요.!';
            default: return '오류!!!';
        }
    }

    private onPreviousClicked = () => {
        const { onProgressed } = this.props;
        onProgressed({ progress: eProgress.previous });
    }

    private onNextClicked = () => {
        const { onProgressed, error, onError, itemId } = this.props;
        if (!error) {
            onError({ isError: true, itemId: itemId });
            return;
        } else {
            if (!error.isError) {
                onProgressed({ progress: eProgress.next });
            }
        }
    }

    private onSubmit = () => {
        const { formOutputSummitReq, isSubmit, answers, formId } = this.props;
        if (isSubmit) {
            formOutputSummitReq({ formId: formId, ansers: answers });
        }
        // tslint:disable-next-line:no-console
        console.log('');
    }
}

const mapStateProps = (state: RootState) => ({
    isSubmit: IsSubmitStep(state),
    formType: getCurFormType(state),
    error: selectModalError(state),
    isFirst: IsFirstStep(state),
    itemId: getFormItemId(state),
    formId: getFormId(state),
    answers: getAnswers(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormModalAction | FormAction>) => ({
    onProgressed: (payload: { progress: eProgress }) => dispatch(formModalSubmitProgressed(payload)),
    onError: (payload: any) => dispatch(formModalSubmitError(payload)),
    formOutputSummitReq: (payload: FormOutputSummitPayload) => dispatch(formOutputSummitReq(payload)),
});

export const FormContentsFooter = connect(mapStateProps, mapDispatchProps)(Footer);
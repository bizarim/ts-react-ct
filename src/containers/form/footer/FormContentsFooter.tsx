import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormModalAction, formModalSubmitProgressed, formModalSubmitError } from '../../../modules/modal/actions';
import { eProgress, eFormType } from '../../../constants';
import { RootState } from '../../../modules/rootReducer';
import { IsSubmitStep, getCurFormType, selectModalError, IsFirstStep } from '../../../modules/modal/selector';
import { FormModalError } from '../../../modules/modal/reducer';
import { FormAction } from '../../../modules/form';

interface ReduxProps {
    isFirst: boolean;
    isSubmit: boolean;
    formType: eFormType;
    error?: FormModalError;
}
interface DispatchPros {
    onProgressed: typeof formModalSubmitProgressed;
}
type Props = ReduxProps & DispatchPros;

class Footer extends React.Component<Props> {

    public render() {
        const { isFirst, isSubmit, error } = this.props;
        return (
            <div className="contents-footer">
                <small className="form-error-msg">
                    {error && !error.never && <i className="fa notice">빈 칸을 채워주세요.</i>}
                </small>
                <div className="btn-wrapper">
                    {isFirst
                        ? null
                        : <button className="btn neg-btn-primary" onClick={this.onPreviousClicked}> 이전 </button>}
                    {isSubmit
                        ? <button className="btn btn-primary" onClick={this.onSubmit}> 체출하기 </button>
                        : <button className="btn btn-primary" onClick={this.onNextClicked}> 다음 </button>}
                </div>
            </div>
        );
    }

    private onPreviousClicked = () => {
        const { onProgressed } = this.props;
        onProgressed({ progress: eProgress.previous });
    }

    private onNextClicked = () => {
        const { onProgressed, error } = this.props;
        if (error) return;
        onProgressed({ progress: eProgress.next });
    }

    private onSubmit = () => {

    }
}

const mapStateProps = (state: RootState) => ({
    isSubmit: IsSubmitStep(state),
    formType: getCurFormType(state),
    error: selectModalError(state),
    isFirst: IsFirstStep(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormModalAction | FormAction>) => ({
    onProgressed: (payload: { progress: eProgress }) => dispatch(formModalSubmitProgressed(payload)),
    onError: (payload: any) => dispatch(formModalSubmitError(payload)),

});

export const FormContentsFooter = connect(mapStateProps, mapDispatchProps)(Footer);
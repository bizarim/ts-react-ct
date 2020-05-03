import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../modules/rootReducer';
import { FormModalAction, formModalInitailize, getFormId } from '../../../modules/modal';
import { FormId } from '../../../modules/modal/types';

interface Props {
    formId: FormId;
    formModalInitailize: typeof formModalInitailize;
}
interface State {

}

const completeMsg = '요청이 완료 되었습니다. 처음부터 다시 하시려면 버튼을 눌러주세요.';
const completeBtn = '다시하기';
class Complete extends React.Component<Props, State> {

    public render() {
        return (
            <section className="form-contents">
                <div data-name="request-form-wrap" className="col-lg-8">
                    <div className="request-form container-fluid">
                        <h3>{completeMsg}</h3>
                        <div className="contents-footer">
                            <div className="btn-wrapper">
                                <button className="btn btn-primary" onClick={this.onComplete}> {completeBtn} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    private onComplete = () => {
        const { formId , formModalInitailize } = this.props;
        formModalInitailize({ formId: formId});
    }
}


const mapStateProps = (state: RootState) => ({
    formId: getFormId(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormModalAction>) => ({
    formModalInitailize: (payload: { formId: FormId }) => dispatch(formModalInitailize(payload)),
});

export const FormComplete = connect(mapStateProps, mapDispatchProps)(Complete);
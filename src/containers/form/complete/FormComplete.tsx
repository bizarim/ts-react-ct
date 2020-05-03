import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormId } from '../../../store/modules/form/types';
import { formViewInitailize, FormViewAction } from '../../../store/modules/form/view/actions';
import { RootState } from '../../../store/rootReducer';
import { getFormId } from '../../../store/modules/form/view/selectors';


interface Props {
    formId: FormId;
    formViewInitailize: typeof formViewInitailize;
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
        const { formId , formViewInitailize } = this.props;
        formViewInitailize({ formId: formId});
    }
}


const mapStateProps = (state: RootState) => ({
    formId: getFormId(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormViewAction>) => ({
    formViewInitailize: (payload: { formId: FormId }) => dispatch(formViewInitailize(payload)),
});

export const FormComplete = connect(mapStateProps, mapDispatchProps)(Complete);
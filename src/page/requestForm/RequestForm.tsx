import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormTitle } from '../../components';
import { FormContents, FormComplete } from '../../containers';
import { InputForm } from '../../store/modules/form/types';
import { formInputGetListReq, FormApiAction } from '../../store/modules/form/api/actions';
import { RootState } from '../../store/rootReducer';
import { selectInputForm } from '../../store/modules/form/api/selectors';
import { isCompleted } from '../../store/modules/form/view/selectors';


interface ReduxProps {
    formDatas: InputForm;
    isCompleted: boolean;
}
interface DispatchProps {
    getInputForm: typeof formInputGetListReq;
}
type Props = DispatchProps & ReduxProps;

class RequestFormComponent extends React.Component<Props> {

    public componentDidMount() {
        this.props.getInputForm();
    }
    public render() {
        const { formDatas, isCompleted } = this.props;
        return (
            <div className="send-request">
                <FormTitle formId={formDatas.formId} title={formDatas.title} />
                {isCompleted ? <FormComplete /> : <FormContents formDatas={formDatas} />}
            </div >
        );
    }
}

const mapStateProps = (state: RootState): ReduxProps => ({
    formDatas: selectInputForm(state),
    isCompleted: isCompleted(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormApiAction>) => ({
    getInputForm: () => dispatch(formInputGetListReq()),
});

export const RequestForm = withRouter(connect(mapStateProps, mapDispatchProps)(RequestFormComponent));
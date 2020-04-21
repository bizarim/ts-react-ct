import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputForm } from '../../modules/types';
import { formInputGetListReq, selectInputForm, FormAction } from '../../modules/form';
import { FormTitle } from '../../components';
import { FormContents } from '../../containers';
import { RootState } from '../../modules/rootReducer';

interface ReduxProps {
    formDatas: InputForm;
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
        const { formDatas } = this.props;
        return (
            <div className="send-request">
                <FormTitle formId={formDatas.formId} title={formDatas.title} />
                <FormContents formDatas={formDatas} />
            </div >
        );
    }
}


const mapStateProps = (state: RootState): ReduxProps => ({
    formDatas: selectInputForm(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormAction>) => ({
    getInputForm: () => dispatch(formInputGetListReq()),
});

export const RequestForm = withRouter(connect(mapStateProps, mapDispatchProps)(RequestFormComponent));
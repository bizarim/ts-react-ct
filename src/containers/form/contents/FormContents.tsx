import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormContentsFooter } from '../footer/FormContentsFooter';
import { ProgressBar } from '../../../components/base/progressBar/ProgressBar';
import { ModalCheckbox } from '../../../components/modal/checkbox/ModalCheckbox';
import { FormInputGetListPayload, OutputFormItem } from '../../../modules/types';
import { eFormType } from '../../../constants';
import { ModalSubmit } from '../../../components/modal/submit/ModalSubmit';
import { RootState } from '../../../modules/rootReducer';
import { formModalCheckboxChecked, FormModalAnswerPayload, FormModalAction, formModalRadioChecked, formModalTextInput } from '../../../modules/modal/actions';
import { getProgressStep, selectCurStep, selectMaxStep, IsSubmitStep, getAnswer } from '../../../modules/modal/selector';
import { ModalRadio } from '../../../components/modal/radio/ModalRadio';
import { ModalTextInput } from '../../../components/modal/textInput/ModalTextInput';
import { ModalSelectbox } from '../../../components/modal/selectbox/ModalSelectbox';

interface FormProps {
    formDatas: FormInputGetListPayload;
    answer: Map<number, OutputFormItem> | undefined;
}
interface ReduxProps {
    progressStep: number;
    curStep: number;
    maxStep: number;
    isSubmit: boolean;
}
interface DispatchProps {
    onCheckboxChecked: typeof formModalCheckboxChecked;
    onRadoChecked: typeof formModalRadioChecked;
    onTextInput: typeof formModalTextInput;
}
type Props = DispatchProps & FormProps & ReduxProps;

class Contents extends React.Component<Props> {

    public render() {
        const { formDatas, isSubmit, curStep, progressStep } = this.props;
        return (
            <section className="form-contents">
                <div data-name="request-form-wrap" className="col-lg-8">
                    <div className="request-form container-fluid">
                        <ProgressBar value={progressStep} />
                        {isSubmit
                            ? <ModalSubmit />
                            : this.renderContentsBody(curStep, formDatas)}
                        <FormContentsFooter />
                    </div>
                </div>
            </section>
        );
    }

    private renderContentsBody(curStep: number, formDatas: FormInputGetListPayload) {
        if (formDatas.items.length <= 0) return null;
        const { onCheckboxChecked, onRadoChecked, onTextInput, answer } = this.props;
        const formType = formDatas.items[curStep].formType;
        const formData = formDatas.items[curStep];

        return (
            <div className="contents-body" >
                {formType === eFormType.Checkbox && <ModalCheckbox formData={formData} answer={answer} formType={formType} onChecked={onCheckboxChecked} />}
                {formType === eFormType.Radio && <ModalRadio formData={formData} answer={answer} formType={formType} onChecked={onRadoChecked} />}
                {formType === eFormType.Selectbox && <ModalSelectbox formData={formData} answer={answer} formType={formType} onChecked={onRadoChecked} />}
                {formType === eFormType.TextInput && <ModalTextInput formData={formData} answer={answer} formType={formType} onChanged={onTextInput} />}
            </div >
        );
    }
}

const mapStateProps = (state: RootState) => ({
    progressStep: getProgressStep(state),
    curStep: selectCurStep(state),
    maxStep: selectMaxStep(state),
    isSubmit: IsSubmitStep(state),
    answer: getAnswer(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormModalAction>) => ({
    onCheckboxChecked: (payload: FormModalAnswerPayload) => dispatch(formModalCheckboxChecked(payload)),
    onRadoChecked: (payload: FormModalAnswerPayload) => dispatch(formModalRadioChecked(payload)),
    onTextInput: (payload: FormModalAnswerPayload) => dispatch(formModalTextInput(payload)),

});

export const FormContents = connect(mapStateProps, mapDispatchProps)(Contents);
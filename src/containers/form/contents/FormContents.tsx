import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { eFormType } from '../../../constants';
import { RootState } from '../../../modules/rootReducer';
import { FormInputGetListPayload, OutputFormItem } from '../../../modules/types';
import { ModalSubmit, FormCheckbox, FormRadio, FormSelectbox, FormTextInput, ProgressBar } from '../../../components';
import { formModalCheckboxChecked, formModalRadioChecked, formModalTextInput, getProgressStep, selectCurStep, selectMaxStep, isSubmitStep, getAnswer, FormModalAction, FormModalAnswerPayload, formModalSelectboxSelected } from '../../../modules/modal';
import { FormContentsFooter } from '../../';

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
    onSelectboxSelected: typeof formModalSelectboxSelected;
}
type Props = DispatchProps & FormProps & ReduxProps;

class Contents extends React.Component<Props> {

    public render() {
        const { formDatas, isSubmit, curStep, progressStep, answer } = this.props;
        return (
            <section className="form-contents">
                <div data-name="request-form-wrap" className="col-lg-8">
                    <div className="request-form container-fluid">
                        <ProgressBar value={progressStep} />
                        {isSubmit
                            ? <ModalSubmit answer={answer} />
                            : this.renderContentsBody(curStep, formDatas)}
                        <FormContentsFooter />
                    </div>
                </div>
            </section>
        );
    }

    private renderContentsBody(curStep: number, formDatas: FormInputGetListPayload) {
        if (formDatas.items.length <= 0) return null;
        const { onCheckboxChecked, onRadoChecked, onSelectboxSelected, onTextInput, answer } = this.props;
        const formType = formDatas.items[curStep].formType;
        const formData = formDatas.items[curStep];

        return (
            <div className="contents-body" >
                {formType === eFormType.Checkbox
                    && <FormCheckbox formData={formData} answer={answer} onChecked={onCheckboxChecked} />}
                {formType === eFormType.Radio
                    && <FormRadio formData={formData} answer={answer} onChecked={onRadoChecked} />}
                {formType === eFormType.Selectbox
                    && <FormSelectbox formData={formData} answer={answer} onSelectboxSelected={onSelectboxSelected} />}
                {formType === eFormType.TextInput
                    && <FormTextInput formData={formData} answer={answer} onTextInput={onTextInput} />}
            </div >
        );
    }
}

const mapStateProps = (state: RootState) => ({
    progressStep: getProgressStep(state),
    curStep: selectCurStep(state),
    maxStep: selectMaxStep(state),
    isSubmit: isSubmitStep(state),
    answer: getAnswer(state),
});

const mapDispatchProps = (dispatch: Dispatch<FormModalAction>) => ({
    onCheckboxChecked: (payload: FormModalAnswerPayload) => dispatch(formModalCheckboxChecked(payload)),
    onRadoChecked: (payload: FormModalAnswerPayload) => dispatch(formModalRadioChecked(payload)),
    onTextInput: (payload: FormModalAnswerPayload) => dispatch(formModalTextInput(payload)),
    onSelectboxSelected: (payload: FormModalAnswerPayload) => dispatch(formModalSelectboxSelected(payload)),
});

export const FormContents = connect(mapStateProps, mapDispatchProps)(Contents);
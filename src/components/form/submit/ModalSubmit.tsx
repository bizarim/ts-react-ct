import React from 'react';
import { OutputFormItem } from '../../../modules/types';

interface Props {
    answer: Map<number, OutputFormItem> | undefined;
}
interface State {

}

const submitMsg = '요청 하시겠습니까?';

export class ModalSubmit extends React.Component<Props, State> {
    public state = {};

    public render() {
        return (
            <h3> {submitMsg}</h3>
        );
    }
}
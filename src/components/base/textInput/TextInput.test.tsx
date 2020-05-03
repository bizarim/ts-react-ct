import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { TextInputProps, TextInput } from './TextInput';

configure({ adapter: new Adapter() });

const defaultProps: TextInputProps = {
    id: 1,
    text: 'test',
    placeHolder: 'input',
    onHandle: jest.fn(),
};

const setup = (props: Partial<TextInputProps> = {}) =>
    shallow(<TextInput {...{ ...defaultProps, ...props }} />);

describe('TextInput', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className form-control', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('form-control')).toBeTruthy();
        // todo
        // find children
    });

    it('should selected textInput', () => {
        const onChange = jest.fn();
        const props: TextInputProps = {
            id: 1,
            text: 'XXXXX',
            placeHolder: 'input',
            onHandle: onChange,
        };
        const wrapper = setup(props);
        const textInput = wrapper.find('input');
        textInput.simulate('change', { target: { value : 'YYY'} });
        expect(onChange).toHaveBeenCalledWith(1, false, 'YYY');
    });


});

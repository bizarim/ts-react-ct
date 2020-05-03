import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { CheckboxProps, Checkbox } from './Checkbox';

configure({ adapter: new Adapter() });

const defaultProps: CheckboxProps = {
    id: 1,
    text: 'test',
    init: false,
    onHandle: jest.fn(),
};

const setup = (props: Partial<CheckboxProps> = {}) =>
    shallow(<Checkbox {...{ ...defaultProps, ...props }} />);

describe('Checkbox', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className checkbox-label', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('checkbox-label')).toBeTruthy();
    });

    it('should selected checkbox', () => {
        const onClicked = jest.fn();
        const props: CheckboxProps = {
            id: 1,
            text: 'XXXXX',
            init: false,
            onHandle: onClicked,
        };
        const wrapper = setup(props);
        const checkbox = wrapper.find({ type: 'checkbox' });
        checkbox.simulate('change');
        expect(onClicked).toHaveBeenCalled();

        const text = wrapper.find('p').text();
        expect(text).toBe(props.text);
    });


});

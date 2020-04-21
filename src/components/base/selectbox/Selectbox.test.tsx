import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { SelectboxProps, Selectbox } from './Selectbox';
import { OutputFormItem } from '../../../modules/types';


configure({ adapter: new Adapter() });

const defaultProps: SelectboxProps = {
    answer: new Map<number, OutputFormItem>(),
    options: [{ id: 1, text: 'fst' }, { id: 2, text: 'scd' }],
    onHandle: jest.fn(),
};

const setup = (props: Partial<SelectboxProps> = {}) =>
    shallow(<Selectbox {...{ ...defaultProps, ...props }} />);

describe('Selectbox', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className base-selectbox', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('base-selectbox')).toBeTruthy();
        // todo
        // find children
    });

    it('should selected option', () => {
        const onChange = jest.fn();
        const props: SelectboxProps = {
            answer: new Map<number, OutputFormItem>(),
            options: [{ id: 1, text: 'fst' }, { id: 2, text: 'scd' }],
            onHandle: onChange,
        };
        const wrapper = setup(props);
        const select = wrapper.find('select').first();
        select.simulate('change', { target: { id: 1, value: 'fst' } });
        expect(onChange).toHaveBeenCalledWith(1, false, 'fst');

        select.simulate('change', { target: { id: 2, value: 'scd' } });
        expect(onChange).toHaveBeenCalledWith(2, false, 'scd');
    });


});

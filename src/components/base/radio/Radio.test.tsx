import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { RadioProps, Radio } from './Radio';

configure({ adapter: new Adapter() });

const defaultProps: RadioProps = {
    id: 1,
    text: 'test',
    init: false,
    onHandle: jest.fn(),
};

const setup = (props: Partial<RadioProps> = {}) =>
    shallow(<Radio {...{ ...defaultProps, ...props }} />);

describe('Radio', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className radio-label', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('radio-label')).toBeTruthy();
    });

    it('should selected Radio', () => {
        const onClicked = jest.fn();
        const props: RadioProps = {
            id: 1,
            text: 'XXXXX',
            init: false,
            onHandle: onClicked,
        };

        const wrapper = setup(props);
        const radio = wrapper.find({ type: 'radio' });
        radio.simulate('change', { target: { checked: true} });
        expect(onClicked).toHaveBeenCalled();

        const text = wrapper.find('p').text();
        expect(text).toBe(props.text);
    });


});

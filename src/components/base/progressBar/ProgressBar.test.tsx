import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { ProgressProps, ProgressBar } from './ProgressBar';

configure({ adapter: new Adapter() });

const defaultProps: ProgressProps = {
    value: 0,
};

const setup = (props: Partial<ProgressProps> = {}) =>
    shallow(<ProgressBar {...{ ...defaultProps, ...props }} />);

describe('ProgressBar', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
    });

    it('should have correct className contents-header', () => {
        const wrapper = setup();
        expect(wrapper.hasClass('contents-header')).toBeTruthy();
        // toContainMatchingElement
    });

    it('should min max value ', () => {
        const minProps: ProgressProps = {
            value: -0,
        };
        const maxProps: ProgressProps = {
            value: 121,
        };
        const minWrapper = setup(minProps);
        const minText = minWrapper.find('p').text();
        expect(minText).toBe('0%');

        const maxWrapper = setup(maxProps);
        const maxText = maxWrapper.find('p').text();
        expect(maxText).toBe('100%');
    });


});

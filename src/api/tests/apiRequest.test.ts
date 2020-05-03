import { AxiosError, AxiosRequestConfig } from 'axios';
import { eErrorCode } from '../../constants';
import { ApiResponse, defaultResponse, formatError } from '..';

describe('Api Request Unit Test', () => {

    it('should return correct defaultResponse', () => {
        const expectedObject = {
            status: 500,
            data: new ApiResponse(eErrorCode.InternalError),
        };
        expect(defaultResponse).toEqual(expectedObject);
    });

    it('should return formatedError from object', () => {
        const config: AxiosRequestConfig = {};
        const headers = { 'content-type': 'application/json' };
        const response = {
            statusText: '',
            headers: headers,
            config: config,
            status: 520,
            data: undefined,
        };
        const responseError: AxiosError = {
            name: '',
            message: '',
            config: config,
            isAxiosError: true,
            response: response,
            toJSON: () => JSON.parse(JSON.stringify(response)),
        };
        expect(formatError(responseError)).toEqual(new ApiResponse(eErrorCode.UnknownError));
    });

});

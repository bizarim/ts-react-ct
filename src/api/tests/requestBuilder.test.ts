import {
    AxiosError,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import {
    defaultResponse,
    formatError,
} from '../base/builder';

describe('Request Builder', () => {
    it('should return correct defaultResponse', () => {
        const expectedObject = {
            status: 500,
            data: {
                error: 'Server error',
            },
        };
        expect(defaultResponse).toEqual(expectedObject);
    });

    it('should return formatedError from object', () => {
        const config: AxiosRequestConfig = {};
        const headers = {
            'content-type': 'application/json',
        };
        const response: AxiosResponse<{ errors: string[] }> = {
            statusText: '',
            headers: headers,
            config: config,
            status: 500,
            data: {
                errors: ['Error'],
            },
        };
        const responseError: AxiosError = {
            name: '',
            message: '',
            config: config,
            isAxiosError: true,
            toJSON: () => response as object,
        };
        const expectedError = {
            code: 500,
            message: ['Error'],
        };
        expect(formatError(responseError)).toEqual(expectedError);
    });

    it('should return formatedError from array', () => {
        const config: AxiosRequestConfig = {};
        const headers = {
            'content-type': 'application/json',
        };

        const response: AxiosResponse<{ errors: string[] }> = {
            statusText: '',
            headers: headers,
            config: config,
            status: 500,
            data: {
                errors: ['Error'],
            },
        };

        const responseError: AxiosError<{ errors: string[] }> = {
            name: '',
            message: '',
            config: config,
            response: response,
            isAxiosError: true,
            toJSON: () => response as object,
        };
        const expectedError = {
            code: 500,
            message: ['Error'],
        };
        expect(formatError(responseError)).toEqual(expectedError);
    });

    it('should user defaultResponse object if responce is undefined', () => {
        const config: AxiosRequestConfig = {};
        const headers = {
            'content-type': 'application/json',
        };
        const response: AxiosResponse<{ errors: string[] }> = {
            statusText: '',
            headers: headers,
            config: config,
            status: 500,
            data: {
                errors: ['Error'],
            },
        };
        const responseError: AxiosError = {
            name: '',
            message: '',
            config: config,
            isAxiosError: true,
            toJSON: () => response as object,
        };
        const expectedError = {
            code: 500,
            message: ['Server error'],
        };
        expect(formatError(responseError)).toEqual(expectedError);
    });

    it('should return empty array if error message is undefined', () => {
        const config: AxiosRequestConfig = {};
        const headers = {
            'content-type': 'application/json',
        };
        const response: AxiosResponse<{ errors: string[] }> = {
            statusText: '',
            headers: headers,
            config: config,
            status: 500,
            data: {
                errors: ['Error'],
            },
        };
        const responseError: AxiosError = {
            name: '',
            message: '',
            config: config,
            isAxiosError: true,
            toJSON: () => response as object,
        };
        const expectedError = {
            code: 500,
            message: [],
        };
        expect(formatError(responseError)).toEqual(expectedError);
    });
});

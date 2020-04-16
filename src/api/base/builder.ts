import axios, {
    AxiosError,
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios';
import { ApiRequest, RequestOptions } from './types';
import { basicToken, withCredentials, getBaseUrl } from './config';

const buildRequest = (request: ApiRequest, configData: RequestOptions) => {
    const { body, method, url } = request;
    const { service, authorization } = configData;
    const baseUrl = getBaseUrl(service);

    const headers = authorization ?
        { 'content-type': 'multipart/form-data', Authorization: `Basic ${basicToken()}` } :
        body instanceof FormData ? { 'content-type': 'multipart/form-data' } : { 'content-type': 'application/json' };

    const requestConfig: AxiosRequestConfig = {
        baseURL: baseUrl,
        data: body,
        headers,
        method,
        url,
        withCredentials: withCredentials(),
    };

    return requestConfig;
};

export const defaultResponse: Partial<AxiosError['response']> = {
    status: 500,
    data: {
        error: 'Server error',
    },
};

export const formatError = (responseError: AxiosError) => {
    const response = responseError.response || defaultResponse;
    const errors = (response.data && (response.data.errors || [response.data.error])) || [];
    return {
        code: response.status,
        message: errors,
    };
};

export const makeRequest = async (request: ApiRequest, configData: RequestOptions): Promise<Response> => {
    const requestConfig = buildRequest(request, configData);

    return new Promise<Response>((resolve, reject) => {
        const axiosRequest: AxiosPromise = axios(requestConfig);
        axiosRequest
            .then((response: AxiosResponse<Response>) => resolve(response.data))
            .catch((error: AxiosError) => reject(formatError(error)));
    });
};

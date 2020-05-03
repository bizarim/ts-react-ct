import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRequest, RequestOptions, ApiResponse } from './types';
import { basicToken, withCredentials, getBaseUrl } from '../../constants/config';
import { eErrorCode } from '../../constants';

/**
 * request 설정 작업
 * @param request body, method, url 설정 객체
 * @param configData 선택 설정 객체
 */
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

/**
 * 기본 Response 값
 */
export const defaultResponse: Partial<AxiosError['response']> = {
    status: 500,
    data: new ApiResponse(eErrorCode.InternalError),
};

/**
 * error response format
 * @param responseError axio error
 */
export const formatError = (responseError: AxiosError) => {
    // todo error logging
    return new ApiResponse(eErrorCode.UnknownError);
};

/**
 * axio request instance 객체로 http 통신
 * @param request body, method, url 설정 객체
 * @param configData 선택 설정 객체
 */
export const makeRequest = async (request: ApiRequest, configData: RequestOptions): Promise<Response> => {
    const requestConfig = buildRequest(request, configData);

    return new Promise<Response>((resolve, reject) => {
        const axiosRequest: AxiosPromise = axios(requestConfig);
        axiosRequest
            .then((response: AxiosResponse<Response>) => resolve(response.data))
            .catch((error: AxiosError) => reject(formatError(error)));
    });
};

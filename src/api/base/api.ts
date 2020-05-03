import { makeRequest } from './builder';
import { RequestOptions, JsonBody, RequestMethod } from './types';

/**
 * Api Wrapper 인터페이스
 */
export interface ApiWrapper {
    get: RequestMethod;
    post: RequestMethod;
    patch: RequestMethod;
    put: RequestMethod;
    delete: RequestMethod;
}

/**
 * ApiWrapper 구현 객체
 */
export const API: ApiWrapper = {
    get: (config: RequestOptions) => async (url: string, body: JsonBody | FormData | undefined) =>
        makeRequest({
            method: 'get',
            url,
            body,
        }, config),

    post: (config: RequestOptions) => async (url: string, body: JsonBody | FormData | undefined) =>
        makeRequest({
            method: 'post',
            url,
            body,
        }, config),

    patch: (config: RequestOptions) => async (url: string, body: JsonBody | FormData | undefined) =>
        makeRequest({
            method: 'patch',
            url,
            body,
        }, config),

    put: (config: RequestOptions) => async (url: string, body: JsonBody | FormData | undefined) =>
        makeRequest({
            method: 'put',
            body,
            url,
        }, config),

    delete: (config: RequestOptions) => async (url: string, body: JsonBody | FormData | undefined) =>
        makeRequest({
            method: 'delete',
            body,
            url,
        }, config),
};

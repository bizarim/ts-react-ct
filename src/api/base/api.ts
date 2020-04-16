import { makeRequest } from './builder';
import { ApiWrapper, RequestOptions, JsonBody } from './types';

export const Api: ApiWrapper = {
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

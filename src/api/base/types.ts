import { AxiosResponse } from 'axios';
import { ServiceType } from '../../constants';

export type HTTPMethod =
    'get'
    | 'post'
    | 'delete'
    | 'put'
    | 'patch';

export interface JsonBody {
    [key: string]: any;
}

export interface ApiRequest {
    method: HTTPMethod;
    url: string;
    body: JsonBody | FormData | undefined;
}

export interface ApiResponse {
    payload: object | undefined;
}

export interface RequestOptions {
    service: ServiceType;
    withHeaders?: boolean;
    authorization?: boolean;
}

export type RequestBody = JsonBody | FormData;

export type RequestMethod = (config: RequestOptions) =>
    (url: string, body?: RequestBody) => Promise<AxiosResponse['data']>;

export interface ApiWrapper {
    get: RequestMethod;
    post: RequestMethod;
    patch: RequestMethod;
    put: RequestMethod;
    delete: RequestMethod;
}
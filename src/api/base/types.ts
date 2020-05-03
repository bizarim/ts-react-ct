import { AxiosResponse } from 'axios';
import { ServiceType, eErrorCode } from '../../constants';

/**
 * HTTP 통신 메소드 enum
 */
export type HTTPMethod =
    'get'
    | 'post'
    | 'delete'
    | 'put'
    | 'patch';

/**
 * JsonBody 인터페이스
 */
export interface JsonBody {
    [key: string]: any;
}

/**
 * Request 설정 인터페이스
 */
export interface RequestOptions {
    service: ServiceType;
    withHeaders?: boolean;
    authorization?: boolean;
}

/**
 * Request Body 타입 정의
 */
export type RequestBody = JsonBody | FormData;

export interface ApiRequest {
    method: HTTPMethod;
    url: string;
    body: JsonBody | FormData | undefined;
}

export interface IResponse {

}

/**
 * Response Payload 인터페이스
 */
export interface IPayload {
    // todo
    // initialize(rt: LayerResult): IPayload;
}

/**
 * Response 구현 객체
 */
export class ApiResponse implements IResponse {
    public code: string;
    public msg: string;
    public payload: IPayload | undefined;

    constructor(rt: eErrorCode = eErrorCode.Success) {
        if (typeof rt === 'number') {
            this.code = `${rt}`;
            this.msg = eErrorCode[rt];
        } else {
            this.code = `${eErrorCode.Undefined}`;
            this.msg = eErrorCode[eErrorCode.Undefined];
        }
    }

    public to(payload: IPayload) {
        this.payload = payload;
        return this;
    }
}

/**
 * Api wrapper안에 함수 리턴 타입
 */
export type RequestMethod = (config: RequestOptions) =>
    (url: string, body?: RequestBody) => Promise<AxiosResponse['data']>;

/**
 * 서비스 타입
 * : 마이크로 서비스라면 사용
 */
export enum ServiceType {
    form = 'form',
}

/**
 * 에러코드 정의
 * : 마이크로 서비스에서 에러코드를 각자 관리한다면
 *   여기서는 공통된것만
 */
export enum eErrorCode {
    Success = 0,
    Undefined = 1,
    BadRequest = 400,
    InternalError = 500,
    UnknownError = 520,
    ApiError = 600,
}

export enum eFormType {
    None = 0,
    Checkbox = 1,
    Radio = 2,
    TextInput = 3,
    Selectbox = 4,
}

export enum eProgress {
    previous,
    next,
    submit,
}
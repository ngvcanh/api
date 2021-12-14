import { EMethod } from './const';
import { IApiPromiseResponse, TApiConfiguration, TApiDataRequest, TApiHeaderRequest, TApiRequestConfig } from './types';
export declare class ApiInstance {
    private static StaticInstance;
    private configs;
    private apiInstance;
    private constructor();
    static getInstance(configs?: Partial<TApiConfiguration>): ApiInstance;
    private _exec;
    private _get;
    private _post;
    private _put;
    private _patch;
    private _delete;
    private _head;
    api<T>(method: EMethod, uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig): IApiPromiseResponse<T>;
}
export declare const createApi: (configs?: Partial<TApiConfiguration>) => ApiInstance;
export declare const apiGet: <T>(uri: string, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;
export declare const apiPost: <T>(uri: string, data?: TApiDataRequest | undefined, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;
export declare const apiPut: <T>(uri: string, data?: TApiDataRequest | undefined, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;
export declare const apiPatch: <T>(uri: string, data?: TApiDataRequest | undefined, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;
export declare const apiDelete: <T>(uri: string, data?: TApiDataRequest | undefined, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;
export declare const apiHead: <T>(uri: string, data?: TApiDataRequest | undefined, headers?: TApiHeaderRequest | undefined, configs?: TApiRequestConfig | undefined) => IApiPromiseResponse<T>;

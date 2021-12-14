import { AxiosInstance, AxiosRequestConfig } from "axios";
import { EContentType } from "./const";
export declare type TApiDataRequest = Record<string, any> | FormData;
export declare type TApiHeaderRequest = HeadersInit | Record<string, any>;
export declare type TApiRequestConfig = AxiosRequestConfig;
export declare type TApiAuthorizationType = 'Bearer' | 'Basic';
export declare type TApiInstance = AxiosInstance;
export declare type TApiPaging = {
    total_items: number;
    total_page: number;
    current_page: number;
};
export declare type TApiConfiguration = {
    baseURL: string;
    accept: EContentType;
    contentType: EContentType;
    credentials: boolean;
    authEnabled: boolean;
    authToken: string;
    authType: TApiAuthorizationType;
    getData: <T>(data: any) => T;
    onError: (error: any) => void;
    keys: Record<keyof TApiPaging, string>;
};
export interface IApiResponse<T, E = unknown> {
    success: boolean;
    data: T | null;
    errors: E;
}
export interface IApiResponsePaging<T> extends IApiResponse<T>, TApiPaging {
}
export declare type IApiPromiseResponse<T> = Promise<IApiResponse<T>>;

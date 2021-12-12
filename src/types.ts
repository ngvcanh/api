import { AxiosInstance, AxiosRequestConfig } from "axios";
import { EContentType } from "./const";

export type TApiDataRequest = Record<string, any> | FormData;

export type TApiHeaderRequest = HeadersInit | Record<string, any>;

export type TApiRequestConfig = AxiosRequestConfig;

export type TApiAuthorizationType = 'Bearer' | 'Basic';

export type TApiInstance = AxiosInstance;

export type TApiPaging = {
  total_items: number;
  total_page: number;
  current_page: number;
}

export type TApiConfiguration = {
  baseURL: string;
  accept: EContentType;
  contentType: EContentType;
  credentials: boolean;
  authEnabled: boolean;
  authToken: string;
  authType: TApiAuthorizationType;
  getData: <T,>(data: any) => T;
  onError: (error: any) => void;
  keys: Record<keyof TApiPaging, string>;
}

export interface IApiResponse<T, E = unknown> {
  success: boolean;
  data: T | null;
  errors: E;
}

export interface IApiResponsePaging<T> extends IApiResponse<T>, TApiPaging{};

export type IApiPromiseResponse<T> = Promise<IApiResponse<T>>;
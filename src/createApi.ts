import axios from 'axios';
import createAuthorization from './createAuthorization';
import createContentType from './createContentType';
import { EContentType, EMethod } from './const';
import {
  IApiPromiseResponse,
  IApiResponse,
  IApiResponsePaging,
  TApiConfiguration,
  TApiDataRequest,
  TApiHeaderRequest,
  TApiInstance,
  TApiRequestConfig
} from './types';

export class ApiInstance{

  private static StaticInstance: ApiInstance;
  private configs: Partial<TApiConfiguration> = {};
  private apiInstance!: TApiInstance;
  
  private constructor(configs: Partial<TApiConfiguration>){
    this.configs = configs;
    
    if (!this.apiInstance){
      const {
        baseURL = '',
        accept = EContentType.JSON,
        contentType = EContentType.JSON,
        credentials = true
      } = this.configs;
      
      this.apiInstance = axios.create({
        baseURL,
        headers: { Accept: accept, ...createContentType(contentType) },
        withCredentials: credentials
      });
    }
  }

  static getInstance(configs: Partial<TApiConfiguration> = {}){
    if (!this.StaticInstance){
      this.StaticInstance = new this(configs);
    }

    return this.StaticInstance;
  }

  private _exec<T>(method: EMethod, uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    configs = (configs ?? {}) as TApiRequestConfig;
    Object.assign(configs, { url: uri, method, headers, data: null });

    if (data) {
      if (configs.method === EMethod.GET) configs.method = EMethod.POST;

      if (data instanceof FormData) {
        headers = Object.assign(headers, createContentType(EContentType.BINARY));
        configs.data = data;
      } else {
        configs.data = data;
      }
    }

    const { 
      authEnabled = false, 
      authToken = '', 
      authType = 'Bearer',
      getData,
      onError,
      keys: { total_page = '', total_items = '', current_page = '' } = {}
    } = this.configs;
    configs.headers = (configs.headers || {});

    authEnabled && !configs.headers.Authorization 
    && Object.assign(configs.headers, createAuthorization(authToken, authType));

    return this.apiInstance.request(configs)
      .then((response) => {
        const result: IApiResponse<T> = {
          data: null,
          success: false,
          errors: null,
        };

        const result1: IApiResponsePaging<T> = {
          ...result,
          current_page: 1,
          total_items: 0,
          total_page: 0
        };

        let hasPaging = false;

        try {
          result.success = Math.floor(response.status / 200) === 1;

          if (result.success) {
            result.data = getData ? getData(response.data) : response.data;
            result.success = true;
            result.errors = [];

            if (total_page && total_page in response.data){
              hasPaging = true;
              result1.total_page = response.data[total_page] ?? 0;
              result1.total_items = total_items ? (response.data[total_items] ?? 0) : 0;
              result1.current_page = current_page ? (response.data[current_page] ?? 1): 1;
            }
          } 
          else {
            result.errors = response.data.errors;
            onError && onError(response.data.errors);
          }
        } 
        catch (e){
          result.errors = e;
        }

        return hasPaging ? { ...result1, ...result } as IApiResponsePaging<T> : result;
      })
      .catch((error) => {
        onError && onError(error);

        if (error.response && error.response.data) {
          return {
            data: error.response.data,
            success: false,
            errors: error
          };
        } 
        else {
          return {
            success: false,
            data: null,
            errors: error
          };
        }
      });
  }

  private _get<T>(uri: string, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.GET, uri, undefined, headers, configs);
  }

  private _post<T>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.POST, uri, data, headers, configs);
  }

  private _put<T>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.PUT, uri, data, headers, configs);
  }
  
  private _patch<T>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.PATCH, uri, data, headers, configs);
  }

  private _delete<T>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.DELETE, uri, data, headers, configs);
  }

  private _head<T>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig){
    return this._exec<T>(EMethod.HEAD, uri, data, headers, configs);
  }

  api<T>(
    method: EMethod, 
    uri: string, 
    data?: TApiDataRequest, 
    headers?: TApiHeaderRequest, 
    configs?: TApiRequestConfig
  ): IApiPromiseResponse<T> {
    switch (method) {
      case EMethod.POST:
        return this._post<T>(uri, data, headers, configs);
  
      case EMethod.PUT:
        return this._put(uri, data, headers, configs);
  
      case EMethod.PATCH:
        return this._patch(uri, data, headers, configs);
  
      case EMethod.HEAD:
        return this._head(uri, data, headers, configs);
  
      case EMethod.DELETE:
        return this._delete(uri, data, headers, configs);
  
      default:
        return this._get<T>(uri, headers, configs);
    }
  }

}

export const createApi = (configs: Partial<TApiConfiguration> = {}) => {
  return ApiInstance.getInstance(configs);
}

export const apiGet = <T,>(uri: string, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.GET, uri, undefined, headers, configs);
}

export const apiPost = <T,>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.POST, uri, data, headers, configs);
}

export const apiPut = <T,>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.PUT, uri, data, headers, configs);
}

export const apiPatch = <T,>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.PATCH, uri, data, headers, configs);
}

export const apiDelete = <T,>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.DELETE, uri, data, headers, configs);
}

export const apiHead = <T,>(uri: string, data?: TApiDataRequest, headers?: TApiHeaderRequest, configs?: TApiRequestConfig) => {
  return createApi().api<T>(EMethod.HEAD, uri, data, headers, configs);
}

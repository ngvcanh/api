import axios from 'axios';

var createAuthorization = function (token, type) {
    if (type === void 0) { type = 'Bearer'; }
    return { Authorization: "".concat(type, " ").concat(token) };
};

var createContentType = function (type) {
    return { "Content-Type": type };
};

var EMethod;
(function (EMethod) {
    EMethod["GET"] = "get";
    EMethod["POST"] = "post";
    EMethod["PUT"] = "put";
    EMethod["PATCH"] = "patch";
    EMethod["HEAD"] = "head";
    EMethod["DELETE"] = "delete";
})(EMethod || (EMethod = {}));
var EContentType;
(function (EContentType) {
    EContentType["JSON"] = "application/json";
    EContentType["BINARY"] = "multipart/form-data";
    EContentType["TEXT"] = "plain/text";
    EContentType["URLENCODED"] = "application/x-www-form-urlencoded";
})(EContentType || (EContentType = {}));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var ApiInstance = /** @class */ (function () {
    function ApiInstance(configs) {
        this.configs = {};
        this.configs = configs;
        if (!this.apiInstance) {
            var _a = this.configs, _b = _a.baseURL, baseURL = _b === void 0 ? '' : _b, _c = _a.accept, accept = _c === void 0 ? EContentType.JSON : _c, _d = _a.contentType, contentType = _d === void 0 ? EContentType.JSON : _d, _e = _a.credentials, credentials = _e === void 0 ? true : _e;
            this.apiInstance = axios.create({
                baseURL: baseURL,
                headers: __assign({ Accept: accept }, createContentType(contentType)),
                withCredentials: credentials
            });
        }
    }
    ApiInstance.getInstance = function (configs) {
        if (configs === void 0) { configs = {}; }
        if (!this.StaticInstance) {
            this.StaticInstance = new this(configs);
        }
        return this.StaticInstance;
    };
    ApiInstance.prototype._exec = function (method, uri, data, headers, configs) {
        configs = (configs !== null && configs !== void 0 ? configs : {});
        Object.assign(configs, { url: uri, method: method, headers: headers, data: null });
        if (data) {
            if (configs.method === EMethod.GET)
                configs.method = EMethod.POST;
            if (data instanceof FormData) {
                headers = Object.assign(headers, createContentType(EContentType.BINARY));
                configs.data = data;
            }
            else {
                configs.data = data;
            }
        }
        var _a = this.configs, _b = _a.authEnabled, authEnabled = _b === void 0 ? false : _b, _c = _a.authToken, authToken = _c === void 0 ? '' : _c, _d = _a.authType, authType = _d === void 0 ? 'Bearer' : _d, getData = _a.getData, onError = _a.onError, _e = _a.keys, _f = _e === void 0 ? {} : _e, _g = _f.total_page, total_page = _g === void 0 ? '' : _g, _h = _f.total_items, total_items = _h === void 0 ? '' : _h, _j = _f.current_page, current_page = _j === void 0 ? '' : _j;
        configs.headers = (configs.headers || {});
        authEnabled && !configs.headers.Authorization
            && Object.assign(configs.headers, createAuthorization(authToken, authType));
        return this.apiInstance.request(configs)
            .then(function (response) {
            var _a, _b, _c;
            var result = {
                data: null,
                success: false,
                errors: null,
            };
            var result1 = __assign(__assign({}, result), { current_page: 1, total_items: 0, total_page: 0 });
            var hasPaging = false;
            try {
                result.success = Math.floor(response.status / 200) === 1;
                if (result.success) {
                    result.data = getData ? getData(response.data) : response.data;
                    result.success = true;
                    result.errors = [];
                    if (total_page && total_page in response.data) {
                        hasPaging = true;
                        result1.total_page = (_a = response.data[total_page]) !== null && _a !== void 0 ? _a : 0;
                        result1.total_items = total_items ? ((_b = response.data[total_items]) !== null && _b !== void 0 ? _b : 0) : 0;
                        result1.current_page = current_page ? ((_c = response.data[current_page]) !== null && _c !== void 0 ? _c : 1) : 1;
                    }
                }
                else {
                    result.errors = response.data.errors;
                    onError && onError(response.data.errors);
                }
            }
            catch (e) {
                result.errors = e;
            }
            return hasPaging ? __assign(__assign({}, result1), result) : result;
        })
            .catch(function (error) {
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
    };
    ApiInstance.prototype._get = function (uri, headers, configs) {
        return this._exec(EMethod.GET, uri, undefined, headers, configs);
    };
    ApiInstance.prototype._post = function (uri, data, headers, configs) {
        return this._exec(EMethod.POST, uri, data, headers, configs);
    };
    ApiInstance.prototype._put = function (uri, data, headers, configs) {
        return this._exec(EMethod.PUT, uri, data, headers, configs);
    };
    ApiInstance.prototype._patch = function (uri, data, headers, configs) {
        return this._exec(EMethod.PATCH, uri, data, headers, configs);
    };
    ApiInstance.prototype._delete = function (uri, data, headers, configs) {
        return this._exec(EMethod.DELETE, uri, data, headers, configs);
    };
    ApiInstance.prototype._head = function (uri, data, headers, configs) {
        return this._exec(EMethod.HEAD, uri, data, headers, configs);
    };
    ApiInstance.prototype.api = function (method, uri, data, headers, configs) {
        switch (method) {
            case EMethod.POST:
                return this._post(uri, data, headers, configs);
            case EMethod.PUT:
                return this._put(uri, data, headers, configs);
            case EMethod.PATCH:
                return this._patch(uri, data, headers, configs);
            case EMethod.HEAD:
                return this._head(uri, data, headers, configs);
            case EMethod.DELETE:
                return this._delete(uri, data, headers, configs);
            default:
                return this._get(uri, headers, configs);
        }
    };
    return ApiInstance;
}());
var createApi = function (configs) {
    if (configs === void 0) { configs = {}; }
    return ApiInstance.getInstance(configs);
};
var apiGet = function (uri, headers, configs) {
    return createApi().api(EMethod.GET, uri, undefined, headers, configs);
};
var apiPost = function (uri, data, headers, configs) {
    return createApi().api(EMethod.POST, uri, data, headers, configs);
};
var apiPut = function (uri, data, headers, configs) {
    return createApi().api(EMethod.PUT, uri, data, headers, configs);
};
var apiPatch = function (uri, data, headers, configs) {
    return createApi().api(EMethod.PATCH, uri, data, headers, configs);
};
var apiDelete = function (uri, data, headers, configs) {
    return createApi().api(EMethod.DELETE, uri, data, headers, configs);
};
var apiHead = function (uri, data, headers, configs) {
    return createApi().api(EMethod.HEAD, uri, data, headers, configs);
};

export { ApiInstance, EContentType, EMethod, apiDelete, apiGet, apiHead, apiPatch, apiPost, apiPut, createApi, createAuthorization, createContentType };

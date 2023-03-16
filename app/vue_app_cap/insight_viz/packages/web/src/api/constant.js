export const baseUrl = '/cap/api/v1/';
let devHost = '';
if (import.meta.env.DEV) {
    // 开发环境使用配置的host
    devHost = import.meta.env.VITE_DEV_HOST;
}
const localhost = devHost || window.location.host;
export const WS_BASE_URL = `ws://${localhost}/cap/ws`;
export const commonUrl = {
    fuzzy_query: '/get_fuzzy_query_data'
};
export const workcenterUrl = {
    get_nok_results: '/get_nok_results',
    get_results: '/get_results',
    get_workcenter_data: '/get_workcenter_data',
    get_results_group_by_error: '/get_results_group_by_error'
};
export const userUrl = {
    login: '/login',
    logout: '/logout'
};
export const boxUrl = {
    analyze: '/box_analyze',
    analyze_result: '/get_analyze_results',
    one_of_analyze_results: '/get_box_analyze_curves',
    get_reference_curve: '/get_reference_curve',
    set_reference_curve: '/set_reference_curve' // 设置参考曲线
};
export const curvesUrl = {
    get_scatter_data: '/get_scatter_data',
    get_curve_list: '/get_curves_list',
    get_curve_data: '/get_curves_data',
    get_tightening_result: '/get_tightening_results',
    download_tightening_result: '/download_tightening_results' // 下载曲线
};
export var ResStatusCode;
(function (ResStatusCode) {
    ResStatusCode[ResStatusCode["CONTINUE"] = 100] = "CONTINUE";
    ResStatusCode[ResStatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    ResStatusCode[ResStatusCode["PROCESSING"] = 102] = "PROCESSING";
    // success
    ResStatusCode[ResStatusCode["OK"] = 200] = "OK";
    ResStatusCode[ResStatusCode["CREATED"] = 201] = "CREATED";
    ResStatusCode[ResStatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    ResStatusCode[ResStatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    ResStatusCode[ResStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResStatusCode[ResStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    ResStatusCode[ResStatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    ResStatusCode[ResStatusCode["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    ResStatusCode[ResStatusCode["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    ResStatusCode[ResStatusCode["IM_USED"] = 226] = "IM_USED";
    // redirection
    ResStatusCode[ResStatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    ResStatusCode[ResStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    ResStatusCode[ResStatusCode["FOUND"] = 302] = "FOUND";
    ResStatusCode[ResStatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    ResStatusCode[ResStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    ResStatusCode[ResStatusCode["USE_PROXY"] = 305] = "USE_PROXY";
    ResStatusCode[ResStatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    ResStatusCode[ResStatusCode["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    // client error
    ResStatusCode[ResStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResStatusCode[ResStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResStatusCode[ResStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    ResStatusCode[ResStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResStatusCode[ResStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResStatusCode[ResStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    ResStatusCode[ResStatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    ResStatusCode[ResStatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    ResStatusCode[ResStatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    ResStatusCode[ResStatusCode["CONFLICT"] = 409] = "CONFLICT";
    ResStatusCode[ResStatusCode["GONE"] = 410] = "GONE";
    ResStatusCode[ResStatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    ResStatusCode[ResStatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    ResStatusCode[ResStatusCode["REQUEST_ENTITY_TOO_LARGE"] = 413] = "REQUEST_ENTITY_TOO_LARGE";
    ResStatusCode[ResStatusCode["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
    ResStatusCode[ResStatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    ResStatusCode[ResStatusCode["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
    ResStatusCode[ResStatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    ResStatusCode[ResStatusCode["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    ResStatusCode[ResStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    ResStatusCode[ResStatusCode["LOCKED"] = 423] = "LOCKED";
    ResStatusCode[ResStatusCode["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    ResStatusCode[ResStatusCode["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    ResStatusCode[ResStatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    ResStatusCode[ResStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    ResStatusCode[ResStatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    ResStatusCode[ResStatusCode["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    // server errors
    ResStatusCode[ResStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ResStatusCode[ResStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    ResStatusCode[ResStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    ResStatusCode[ResStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    ResStatusCode[ResStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    ResStatusCode[ResStatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    ResStatusCode[ResStatusCode["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    ResStatusCode[ResStatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    ResStatusCode[ResStatusCode["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    ResStatusCode[ResStatusCode["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    ResStatusCode[ResStatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED"; // 'Network Authentication Required', 'The client needs to authenticate to gain network access')
})(ResStatusCode || (ResStatusCode = {}));

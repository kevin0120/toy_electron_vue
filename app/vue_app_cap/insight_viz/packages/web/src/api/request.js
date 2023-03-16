import axios from 'axios';
import { baseUrl } from './constant';
import Cookies from 'js-cookie';
import qs from 'qs';
const sessionId = Cookies.get('session_id') || '';
const instance = axios.create({
    // 创建axios实例，在这里可以设置请求的默认配置
    timeout: 10000,
    // withCredentials: false,
    baseURL: baseUrl,
    headers: {
        'X-Openerp-Session-Id': sessionId,
        'X-Org-Name': 'oneshare'
    }
});
instance.defaults.headers.post['Content-Type'] = 'application/json';
// const httpCode = {
//   400: '请求参数错误',
//   401: '权限不足, 请重新登录',
//   403: '服务器拒绝本次访问',
//   404: '请求资源未找到',
//   500: '内部服务器错误',
//   501: '服务器不支持该请求中使用的方法',
//   502: '网关错误',
//   504: '网关超时'
// };
/** 添加请求拦截器 **/
instance.interceptors.request.use((config) => {
    if (config.method === 'get') {
        config.paramsSerializer = {
            serialize: function (params) {
                return decodeURIComponent(qs.stringify(params, { arrayFormat: 'comma' }));
            }
        };
    }
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});
/** 添加响应拦截器  **/
instance.interceptors.response.use((response) => {
    if (response?.data?.error) {
        // 如果有后端自定义的错误信息, 前台提示后端自定义错误信息
        return Promise.reject(response?.data?.error);
    }
    if (response.headers['content-type'] === 'application/zip') {
        return Promise.resolve(response);
    }
    return Promise.resolve(response.data);
}, (error) => {
    if (error?.response?.data?.error) {
        // 如果有后端自定义的错误信息, 前台提示后端自定义错误信息
        return Promise.reject(error?.response?.data?.error);
    }
    else {
        return Promise.reject(error);
    }
});
/* 统一封装get请求 */
export const getApi = (url, params = {}, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
/* 统一封装post请求  */
export const postApi = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
/* 统一封装delete请求  */
export const deleteApi = (url, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'delete',
            url,
            ...config
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};
/* 统一封装put请求  */
export const putApi = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'put',
            url,
            data,
            ...config
        })
            .then((response) => {
            resolve(response);
        })
            .catch((error) => {
            reject(error);
        });
    });
};

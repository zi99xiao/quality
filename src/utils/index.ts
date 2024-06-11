import axios from 'axios';
import {Message} from "./message";
import Cookies from "js-cookie";


const token: string | undefined = Cookies.get('Authorization')

// axios封装
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
    // withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(function (config) {
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, function (error: any) {
    return Promise.reject(error)
})


// 响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log("响应拦截器")
    return response;
}, function (error: any) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // console.log('res', error)
    let message: string
    if (error.response) {
        let status = error.response.status
        let msg = error.response.data.message
        switch (status) {
            case 401:
                message = 'token过期'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 405:
                message = '方法不被允许'
                break
            default:
                message = msg
                break
        }
        Message(message, 'error')
    } else {
        message = '请求超时'
        Message(message, 'error')
    }

    return Promise.reject(error);
});

export default service
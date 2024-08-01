import axios from 'axios';
import {Message} from "./message";
import {getCookie} from "./cookie.ts";


const token: string | undefined = getCookie('Authorization')

// axios封装
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
    // withCredentials: true,
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
    const { status, statusText, data, headers } = response;
    if (status === 200) {
        //此处判断是否下载请求
        if (headers['content-type'] === 'application/octet-stream' || headers['content-disposition']) {
            //根据响应头获取文件名称
            let fileName = headers['content-disposition'].match(/filename=(.*)/)[1]
            if (fileName) {
                fileName = decodeURI(fileName)
            } else {
                //此处表示后台没有设置响应头 content-disposition,请根据业务场景自行处理
                fileName = "下载文件"
            }
            const blob = new Blob([data], { type: 'application/octet-stream' })
            const blobURL = window.URL.createObjectURL(blob)
            const tempLink = document.createElement('a')
            tempLink.style.display = 'none'
            tempLink.href = blobURL
            tempLink.setAttribute('download', fileName)
            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank')
            }
            document.body.appendChild(tempLink)
            tempLink.click()
            document.body.removeChild(tempLink)
            window.URL.revokeObjectURL(blobURL)
        } else {
            //非下载请求返回的数据为json
            return response
        }
    } else {
        console.error(status, statusText, data)
    }
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
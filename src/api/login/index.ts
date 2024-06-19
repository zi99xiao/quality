import service from "../../utils/index";

// 登录
export const login = (data: {}) => {
    return service({
        method: 'post',
        baseURL: '/api',
        url: '/login/acLogin',
        params: data,
    })
}

// 用户角色
export const getUserRole = (data: {}) => {
    return service({
        method: 'post',
        withCredentials: true,
        baseURL: '/api',
        url: '/user/get-role',
        params: data,
    })
}

// 获取菜单/按钮
export const getMenuButtonList = (data: {}) => {
    return service({
        method: 'get',
        baseURL: '/api',
        withCredentials: true,
        url: '/permission/module',
        params: data,
    })
}

// 修改密码
export const editPwdData = (data: {}) => {
    return service({
        method: 'post',
        baseURL: '/api',
        url: '/user/update-password',
        data: data,
    })
}
import service from "../../utils/index";

export const login = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

// 修改密码
export const editPwdData = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}
import service from "../../utils/index";

export const getExceptionList = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const getExceptionDetail = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const addException = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const editException = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const delException = (data: string[]) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}
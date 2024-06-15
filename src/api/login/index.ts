import service from "../../utils/index";

export const login = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}
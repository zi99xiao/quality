import service from "../../utils/index";


export const getMaintenanceList = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const getMaintenanceDetail = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const addMaintenance = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const editMaintenance = (data: {}) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}

export const delMaintenance = (data: string[]) => {
    return service({
        method: 'post',
        url: '',
        data: data,
    })
}
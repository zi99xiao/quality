import Cookies from 'js-cookie'

// name:字段名称，value:保存的值，expires:保存的时间
export const setCookie = (name: string, value: any, expires: number) => {
    Cookies.set(name, value, {expires: expires})
}

export const getCookie = (name: string) => {
    const value: string | undefined = Cookies.get(name)
    if (value) return value
    else return
}

export const delCookie = (name: string) => {
    Cookies.remove(name)
}
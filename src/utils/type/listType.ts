export interface TabListType {
    name: string
    label: string
    component?: any
}

export interface SelectType {
    value: string | boolean | number
    label: string
    type?: string
}

export interface DisabledInter {
    id: string[]
    disabled: boolean
}

export interface Meta {
    title?: string
    icon?: string
    requireAuth?: boolean
    sortNum?: number | null
}

export interface Routes {
    path: string
    redirect?: string
    name: string
    component?: any
    meta: Meta
    children?: Routes[]
}
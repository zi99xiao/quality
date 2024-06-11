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
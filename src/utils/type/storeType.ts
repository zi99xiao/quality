import {SelectType} from "./listType.ts";

export interface colType {
    // 字段中文名
    label: string
    // 字段值
    prop?: string
    // 字段展示值
    propName?: string
    // 最小宽度
    minWidth?: string
    // 是否固定
    fixed?: string
    // 排序
    sortable?: boolean
    // 数据展示类型
    type?: string
    // 当类型为下拉框之类的时候传递数据
    data?: SelectType[],
    // 排序
    order?: number
    // 单元格是否可以编辑
    cellEdit?: boolean,
    // 是否显示该列
    isShow?: boolean
    // 用于操作控制列的显示z
    isHide?: string
    // 控制列的禁用
    isDisabled?: boolean
    // 是否能在弹窗表格表头搜索
    isSearch?: boolean
    // 子级表头
    children?: colType[]
}

export interface btnType {
    edit: boolean
    del: boolean
    detail: boolean
}

export interface optionsType {
    column: colType[]
    btn?: btnType
}

export interface conditionType {
    [key: string]: any;
}

export interface paramsType {
    page?: number
    limit?: number
    filters?: any[]
    orders?: any[]
    condition?: conditionType
}
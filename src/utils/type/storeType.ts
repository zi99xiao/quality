import {SelectType} from "./listType";

// 仓库通用数据接口类型
export interface colType {
    // 列名
    label: string
    // 字段值
    prop?: string
    // 最小宽度
    minWidth?: string
    // 是否固定
    fixed?: boolean
    // 排序
    sortable?: boolean
    // 数据展示类型
    type?: string
    // 当类型为下拉框之类的时候传递数据
    data?: SelectType[],
    // 排序
    order?: number
    // 表格是否可以编辑
    cellEdit?: boolean,
    // 是否显示该列
    isShow?: boolean
    // 用于操作控制列的显示
    isHide?: string
    // 控制列的禁用
    isDisabled?: boolean
    // 是否能在弹窗表格表头搜索
    isSearch?: boolean
    // 用于操作控制列搜索的显示
    isHideSearch?: string
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
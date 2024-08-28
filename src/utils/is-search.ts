/*// 字符串类型数据搜索
export const handleSearchString = (search: string, column: string, operator: string, store: any) => {
    store.loading = true
    if (search) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    } else {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
    }
    store.getTableData()
}

// 日期数组类型数据搜索
export const handleSearchDate = (search: string[] | null, column: string, operator: string, store: any) => {
    store.loading = true
    if (search && search.length > 0) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search.join(','),
            operator: operator
        });
    } else {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
    }
    store.getTableData()
}

// 布尔类型数据搜索
export const handleSearchBool = (search: boolean, column: string, operator: string, store: any) => {
    store.loading = true
    if (search || !search) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    } else {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
    }
    store.getTableData()
}

// 数字类型数据搜索
export const handleSearchNumber = (search: number, column: string, operator: string, store: any) => {
    store.loading = true
    if (search || search === 0) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    } else {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
    }
    store.getTableData()
}*/
// 统一搜索函数，多类型集合搜索，优化代码
export const handleSearch = (search: unknown, column: string, operator: string, store: any) => {
    store.loading = true
    // 字符类型
    if (typeof search === 'string' && search) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    }
    // 日期数组类型
    else if (Array.isArray(search) && search.length > 0) {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search.join(','),
            operator: operator
        });
    }
    // 布尔类型
    else if (typeof search === 'boolean') {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    }
    // 数字类型
    else if (typeof search === 'number') {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
        store.params.filters.push({
            column: column,
            value: search,
            operator: operator
        });
    }
    // null类型或者未定义的undefined类型
    else {
        store.params.filters = store.params.filters!.filter((item: any) => {
            return item.column !== column;
        });
    }
    store.getTableData()
}
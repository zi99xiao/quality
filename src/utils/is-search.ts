// 字符串类型数据搜索
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
}
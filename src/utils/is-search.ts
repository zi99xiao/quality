// 字符串类型数据搜索
export const handleSearchString = (search: string, column: string, operator: string, store: any) => {
    store.loading = true
    console.log(111, search)
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

// 字符串数组类型数据搜索——例如日期数组
export const handleSearchArray = (search: string[], column: string, operator: string, store: any) => {
    store.loading = true
    if (search.length > 0) {
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

// 1/0数字类型数据搜索
export const handleSearchOneZero = (search: number, column: string, operator: string, store: any) => {
    store.loading = true
    if (search === 1 || search === 0) {
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
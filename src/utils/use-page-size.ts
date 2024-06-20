// 分页函数
export const UsePageSize = (store: any) => {
    // 切换页码
    function handleCurrentChange(current: number) {
        store.params.page = current
        store.loading = true
        store.getTableData()
    }

    // 切换每页条数
    function handleSizeChange(size: number, current: number) {
        store.params.page = current
        store.params.limit = size
        store.loading = true
        store.getTableData()
    }

    return {
        handleCurrentChange,
        handleSizeChange
    }
}
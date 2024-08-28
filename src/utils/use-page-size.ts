import {Ref} from "vue";
import {scrollToTop} from "./scroll-to-top";

// 分页函数
export const UsePageSize = (store: any, ref: Ref<any>) => {
    // 切换页码
    function handleCurrentChange(current: number) {
        store.params.page = current
        store.loading = true
        store.getTableData()
        scrollToTop(ref.value)
    }

    // 切换每页条数
    function handleSizeChange(size: number, current: number) {
        store.params.page = current
        store.params.limit = size
        store.loading = true
        store.getTableData()
        scrollToTop(ref.value)
    }

    return {
        handleCurrentChange,
        handleSizeChange
    }
}
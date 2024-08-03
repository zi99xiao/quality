import {computed} from "vue";

// 控制表格列的显隐函数
export function colChange(val: string[], columns: any[], all: string, ind: string, fil: string, field: string, store: any) {
    const checkedCount = val.length
    store[all] = checkedCount === columns.map((obj: any) => obj[field]).length
    store[ind] = checkedCount > 0 && checkedCount < columns.map((obj: any) => obj[field]).length
    columns.forEach((col: any) => {
        col[fil] = val.includes(col[field])
        // 递归调用处理子级表头
        if (col.children && col.children.length > 0) {
            const children = computed(() => col.children.filter((col: any) => col[field]))
            colChange(val, children.value, all, ind, fil, field, store)
        }
    })
}
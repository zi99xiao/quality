import {ref} from "vue";

// 表格多选
export function SelectTableId() {
    const selId = ref<string[]>([])

    function rowSel(val: any) {
        selId.value = val.map((item: any) => item['id'])
    }

    return {
        selId,
        rowSel
    }
}
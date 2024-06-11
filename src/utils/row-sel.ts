import {ref} from "vue";

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
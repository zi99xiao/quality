import {Message} from "./message";
import {Ref} from "vue";

// 双击表格行编辑保存
export function ClickRowSave(store: any, detailInterface: Function, editInterface: Function) {
    function rowGetDetail(row: any, dbValue: Ref<any>) {
        if (Object.keys(dbValue.value).length === 0 || dbValue.value.id !== row.id) {
            detailInterface(row.id).then((res: any) => {
                if (res.data.code === 0) {
                    dbValue.value = res.data.data
                } else {
                    Message(res.data.message, 'error')
                    store.loading = false
                }
            }).catch(() => {
                store.loading = false
            })
        }
    }

    function rowSave(row: any, dbId: Ref<string>) {
        editInterface(row).then((res: any) => {
            if (res.data.code === 0) {
                Message('修改成功', 'success')
                dbId.value = ''
                store.getTableData()
            } else {
                Message(res.data.message, 'error')
                store.loading = false
            }
        }).catch(() => {
            // console.log(err)
            store.loading = false
            // Message(err, 'error')
        })
    }

    return {
        rowGetDetail,
        rowSave
    }
}
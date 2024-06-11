import {ElMessageBox} from "element-plus";
import {Message} from "./message";
import {Ref} from "vue";

export function MoreDel(store: any, selId: Ref<string[]>, delInterface: Function,) {
    function OpenDel() {
        if (selId.value.length > 0) {
            ElMessageBox.confirm(
                `确认删除这${selId.value.length}条数据吗?`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                store.loading = true
                delInterface(selId.value[0]).then((res: any) => {
                    if (res.data.code === 0) {
                        Message('删除成功', 'success')
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
            }).catch(() => {
                Message('取消删除', 'info')
            })
        } else if (selId.value.length > 1) {
            Message('只能勾选一条数据单个删除', 'warning')
        } else {
            Message('未勾选数据', 'warning')
        }
    }

    return {
        OpenDel
    }
}
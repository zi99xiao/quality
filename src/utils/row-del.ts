import {Message} from "./message";

export function RowDel(store: any, delInterface: Function) {
    // 删除当前行
    function rowDel(row: any) {
        store.loading = true
        delInterface([row.id]).then((res: any) => {
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
    }

    return {
        rowDel
    }
}
import {Message} from "./message";

// 删除当前行
export function RowDel(store: any, delInterface: Function) {
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
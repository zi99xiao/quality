import {ref} from "vue";
import {Message} from "./message";

// 新增按钮操作和保存
export function IsAdd(store: any, addInterface: Function) {
    const addRef = ref<any>()

    function OpenAdd() {
        addRef.value.add = true
    }

    function SubmitAdd(val: any) {
        store.loading = true
        addInterface(val).then((res: any) => {
            if (res.data.code === 0) {
                Message('添加成功', 'success')
                addRef.value.add = false
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
        addRef,
        OpenAdd,
        SubmitAdd
    }
}
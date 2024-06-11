// 定义提示
import {ElMessage} from "element-plus";

export const Message = (message: string, type: any) => {
    ElMessage({
        message,
        type,
        showClose: true,
        grouping: true,
    })
}
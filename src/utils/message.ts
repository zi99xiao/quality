import {ElMessage} from "element-plus";

// 定义提示
export const Message = (message: string, type: any) => {
    ElMessage({
        message,
        type,
        showClose: true,
        grouping: true,
    })
}
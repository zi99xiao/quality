import {acceptHMRUpdate, defineStore} from 'pinia'
import {Message} from "../../utils/message";
import {getMenuButtonList, getUserRole} from "../../api/login";
import {getCookie} from "../../utils/cookie";
import {ref} from "vue";


// 检测数据查询
export const useLoginStore = defineStore('login', () => {
    const roles = ref<any[]>([])

    function getUserRoleData() {
        getUserRole({tenantId: getCookie('tenantId')}).then((res: any) => {
            if (res.data.code === 0) {
                roles.value = res.data.data
            } else {
                Message(res.data['message'], 'error')
            }
        })
    }


    const menus = ref<any[]>([])
    const buttons = ref<any[]>([])

    function getMenuButtonData() {
        getMenuButtonList({}).then((res: any) => {
            if (res.data.code === 0) {
                menus.value = res.data.data[0].rows.filter((val: any) => val.type === 1)
                buttons.value = res.data.data[0].rows.filter((val: any) => val.type === 2)
            } else {
                Message(res.data['message'], 'error')
            }
        })
    }

    return {
        roles,
        getUserRoleData,
        menus,
        buttons,
        getMenuButtonData,
    }
})

// 热更新store
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot))
}
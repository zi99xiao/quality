import {acceptHMRUpdate, defineStore} from 'pinia'
import {reactive, ref} from "vue";
import {Message} from "../../utils/message";
import {getExceptionList} from "../../api/exception";
import {optionsType, paramsType} from "../../utils/type/storeType";


// 检测数据查询
export const useExceptionStore = defineStore('exception', () => {
    // 定义表格字段
    const options = reactive<optionsType>({
        column: [
            {
                label: '异常来源',
                prop: 'origin',
                propName: 'origin',
                minWidth: '100',
                sortable: false,
                isShow: true,
                isSearch: true,
                type: 'text',
                order: 1,
                children: []
            },
            {
                label: '异常信息',
                prop: 'information',
                propName: 'information',
                minWidth: '100',
                sortable: false,
                isShow: true,
                isSearch: true,
                type: 'text',
                order: 1,
                children: []
            },
            {
                label: '异常原因',
                prop: 'reason',
                propName: 'reason',
                minWidth: '100',
                sortable: false,
                isShow: true,
                isSearch: true,
                type: 'text',
                order: 1,
                children: []
            },
        ],
        btn: {edit: false, del: false, detail: false},
    })

    // 获取表格数据
    const tableData = ref<any[]>([])
    const loading = ref<boolean>(true)
    const total = ref<number>(0)

    const params = reactive<paramsType>({
        page: 1,
        limit: 20,
        orders: [{
            asc: false,
            column: 'lastTime'
        }],
        filters: [],
        condition: {},
    })

    function getTableData() {
        getExceptionList(params).then((res: any) => {
            if (res.data.code === 0) {
                tableData.value = res.data.data
                total.value = res.data.total
            } else {
                Message(res.data['msg'], 'error')
            }
            loading.value = false
        }).catch(() => {
            // console.log(err)
            loading.value = false
            // Message(err, 'error')
        })
    }

    return {
        options,
        tableData,
        loading,
        getTableData,
        total,
        params
    }
})

// 热更新store
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useExceptionStore, import.meta.hot))
}
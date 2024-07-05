import {acceptHMRUpdate, defineStore} from 'pinia'
import {reactive, ref} from "vue";
import {Message} from "../../utils/message";
import {getMaintenanceList} from "../../api/maintenance";
import {optionsType, paramsType} from "../../utils/type/storeType";
import {isYesNoList, questionTypeList} from "../../utils/select-list.ts";


// 检测数据查询
export const useMaintenanceStore = defineStore('maintenance', () => {
    // 定义表格字段
    const options = reactive<optionsType>({
        column: [
            {
                label: '分类来源',
                prop: 'origin',
                minWidth: '150',
                sortable: false,
                cellEdit: true,
                isShow: true,
                isSearch: true,
                type: 'text',
                children: []
            },
            {
                label: '分类描述',
                prop: 'description',
                minWidth: '150',
                sortable: false,
                cellEdit: true,
                isShow: true,
                type: 'textarea',
                children: []
            },
            {
                label: '对应类型',
                prop: 'type',
                minWidth: '150',
                sortable: false,
                cellEdit: true,
                isShow: true,
                isSearch: true,
                type: 'select',
                data: questionTypeList,
                children: []
            },
            {
                label: '是否分解',
                prop: 'decompose',
                minWidth: '100',
                sortable: false,
                cellEdit: true,
                isShow: true,
                isSearch: true,
                type: 'select',
                data: isYesNoList,
                children: []
            },
            {
                label: '创建人',
                prop: 'createUser',
                minWidth: '100',
                sortable: false,
                isShow: true,
                type: 'text',
                children: []
            },
            {
                label: '创建时间',
                prop: 'createTime',
                minWidth: '150',
                sortable: true,
                isShow: true,
                type: 'text',
                children: []
            },
            {
                label: '最后修改人',
                prop: 'lastUser',
                minWidth: '100',
                sortable: false,
                isShow: true,
                type: 'text',
                children: []
            },
            {
                label: '最后修改时间',
                prop: 'lastTime',
                minWidth: '150',
                sortable: true,
                isShow: true,
                type: 'text',
                children: []
            },
            {
                label: '是否有效',
                prop: 'effective',
                minWidth: '100',
                sortable: false,
                isShow: true,
                type: 'text',
                children: []
            },
        ],
        btn: {edit: false, del: true, detail: false},
    })

    // 获取表格数据
    const tableData = ref<any[]>([
        {
            id: '1',
            origin: '来源1',
            description: '描述1',
            type: '0',
            decompose: '1',
            createUser: '创建人1',
            createTime: '2024-06-07',
            lastUser: '修改人1',
            lastTime: '2024-06-07',
            effective: '是'
        },
        {
            id: '2',
            origin: '来源2',
            description: '描述2',
            type: '1',
            decompose: '0',
            createUser: '创建人2',
            createTime: '2024-06-07',
            lastUser: '修改人2',
            lastTime: '2024-06-07',
            effective: '否'
        },
        {
            id: '3',
            origin: '来源3',
            description: '描述3',
            type: '1',
            decompose: '0',
            createUser: '创建人3',
            createTime: '2024-06-08',
            lastUser: '修改人1',
            lastTime: '2024-06-08',
            effective: '否'
        },
    ])
    const loading = ref<boolean>(true)
    const total = ref<number>(0)

    const params = reactive<paramsType>({
        page: 1,
        limit: 20,
        orders: [{
            asc: false,
            column: 'lastUpdateTime'
        }],
        filters: [],
        condition: {},
    })

    function getTableData() {
        getMaintenanceList(params).then((res: any) => {
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
    import.meta.hot.accept(acceptHMRUpdate(useMaintenanceStore, import.meta.hot))
}
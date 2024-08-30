import HeaderSearch from "./header-search/index.vue";
import MyTable from "./my-table/index.vue";
import Pagination from "./pagination/index.vue"


// 自定义插件注册全局组件
const allGlobalComponent = {
    HeaderSearch,
    MyTable,
    Pagination,
}
export default {
    install(app: any) {
        Object.keys(allGlobalComponent).forEach((key: string) => {
            app.component(key, allGlobalComponent[key])
        })
    }
}
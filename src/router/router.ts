import {createRouter, createWebHashHistory, Router} from 'vue-router'
import {routes} from "./route";
import {getCookie} from "../utils/cookie";
import {NStart, NClose} from "../utils/nprogress";


const router: Router = createRouter({
    history: createWebHashHistory(),
    // 路由配置
    routes,
    // 是否严格匹配路由
    strict: true,
    // 路由跳转完成后，页面滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach(async (to, from) => {
    NStart()
    const token: string | undefined = getCookie('Authorization')
    // 返回 false 以取消导航
    if (token && to.name !== 'login') {
        return true
    } else if (token && to.name === 'login') {
        return from.path
    } else if (!token && to.name === 'login') {
        return true
    } else if (!token && to.meta.requireAuth) {
        return 'login'
    } else {
        return false
    }
})

router.afterEach(async () => {
    NClose()
})

export default router;
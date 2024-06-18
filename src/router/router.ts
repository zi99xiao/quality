import {createRouter, createWebHistory, Router} from 'vue-router'
import {routes} from "./route.ts";
import {getCookie} from "../utils/cookie.ts";
import {NStart, NClose} from "../utils/nprogress.ts";


const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

const token: string | undefined = getCookie('Authorization')

router.beforeEach((to, from) => {
    NStart()
    // 返回 false 以取消导航
    if (token && to.name !== 'login') {
        return true
    } else if (token && to.name === 'login') {
        return from.fullPath
    } else if (!token && to.name === 'login') {
        return true
    } else if (!token && to.meta.requireAuth) {
        return 'login'
    } else {
        return false
    }
})

router.afterEach(() => {
    NClose()
})

export default router;
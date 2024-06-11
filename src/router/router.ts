import {createRouter, createWebHistory, Router} from 'vue-router'
import {routes} from "./route.ts";


const router: Router = createRouter({
    history: createWebHistory(),
    routes,
})

/*router.beforeEach((to, from) => {
    // 返回 false 以取消导航
    return false
})*/

export default router;
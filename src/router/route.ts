export const routes = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/login/Login.vue'),
    },

    // 主页面
    {
        path: '/',
        redirect: '/maintenance',
        name: 'layout',
        component: () => import('../views/layout/Layout.vue'),
        meta: {
            title: '主页面',
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled'
                },
                component: () => import('../views/home/index.vue'),
            },
            {
                path: '/maintenance',
                name: 'maintenance',
                meta: {
                    title: '关系维护',
                    icon: 'Rank'
                },
                component: () => import('../views/maintenance/index.vue'),
            },
            {
                path: '/exception',
                name: 'exception',
                meta: {
                    title: '异常管理',
                    icon: 'Warning',
                },
                component: () => import('../views/exception/index.vue'),
            },
        ],
    },

    // 不存在的页面
    {
        path: '/:pathMatch(.*)',
        name: 'NotFound',
        meta: {
            title: '不存在的页面',
        },
        component: () => import('../components/404.vue'),
    },
]
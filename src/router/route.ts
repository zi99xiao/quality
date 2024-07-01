export const routes = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            requireAuth: false
        },
        component: () => import('../views/login/Login.vue'),
    },
    // 首页
    {
        path: '/',
        redirect: '/home',
        name: '/',
        meta: {
            title: '首页',
            requireAuth: true
        },
        component: () => import('../views/layout/Layout.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    requireAuth: true
                },
                component: () => import('../views/home/index.vue'),
            }
        ]
    },
    // 主页面
    {
        path: '/layout',
        redirect: '/maintenance',
        name: 'layout',
        component: () => import('../views/layout/Layout.vue'),
        meta: {
            title: '主页面',
            requireAuth: true
        },
        children: [
            {
                path: '/maintenance',
                name: 'maintenance',
                meta: {
                    title: '关系维护',
                    icon: 'Rank',
                    requireAuth: true
                },
                component: () => import('../views/maintenance/index.vue'),
            },
            {
                path: '/exception',
                name: 'exception',
                meta: {
                    title: '异常管理',
                    icon: 'Warning',
                    requireAuth: true
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
            requireAuth: true
        },
        component: () => import('../components/404.vue'),
    },
]
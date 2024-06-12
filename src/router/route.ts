export const routes = [
    // 登录
    // {
    //     path: '/login',
    //     name: 'login',
    //     meta: {
    //         title: '登录',
    //     },
    //     component: () => import('../views/login/Login.vue'),
    // },

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
            {
                path: '/test1',
                name: 'test1',
                meta: {
                    title: '法律法规',
                    icon: 'QuestionFilled',
                },
                component: () => import('../views/test1/index.vue'),
            },
            {
                path: '/test2',
                name: 'test2',
                meta: {
                    title: '企业文化',
                    icon: 'Histogram',
                },
                component: () => import('../views/test2/index.vue'),
            },
            {
                path: '/test3',
                name: 'test3',
                meta: {
                    title: '管理制度',
                    icon: 'Management',
                },
                component: () => import('../views/test3/index.vue'),
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
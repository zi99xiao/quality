export const routes = [
    // 登录
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            requireAuth: false,
            hidden: true
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
            requireAuth: true,
            hidden: false
        },
        component: () => import('../views/layout/Layout.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'HomeFilled',
                    requireAuth: true,
                    hidden: false
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
            requireAuth: true,
            hidden: false
        },
        children: [
            {
                path: '/maintenance',
                name: 'maintenance',
                meta: {
                    title: '关系维护',
                    icon: 'Rank',
                    requireAuth: true,
                    hidden: false
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
            {
                path: '/test',
                redirect: '/test/test1',
                name: 'test',
                meta: {
                    title: '考试管理',
                    icon: 'Warning',
                    requireAuth: true,
                    hidden: false
                },
                children: [
                    {
                        path: '/test/test1',
                        name: 'test1',
                        meta: {
                            title: '法律法规',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test1.vue'),
                    },
                    {
                        path: '/test/test2',
                        name: 'test2',
                        meta: {
                            title: '企业文化',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test2.vue'),
                    },
                    {
                        path: '/test/test3',
                        name: 'test3',
                        meta: {
                            title: '管理制度',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test3.vue'),
                    },
                    {
                        path: '/test/test4',
                        name: 'test4',
                        meta: {
                            title: '2024-08制度',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test4.vue'),
                    },
                    {
                        path: '/test/test5',
                        name: 'test5',
                        meta: {
                            title: 'ZXY-ZZ',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test5.vue'),
                    },
                    {
                        path: '/test/test6',
                        name: 'test6',
                        meta: {
                            title: 'HLYJ-ZZ',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test6.vue'),
                    },
                    {
                        path: '/test/test7',
                        name: 'test7',
                        meta: {
                            title: 'BJQ1',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test7.vue'),
                    },
                    {
                        path: '/test/test8',
                        name: 'test8',
                        meta: {
                            title: 'BJQ2',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test8.vue'),
                    },
                    {
                        path: '/test/test9',
                        name: 'test9',
                        meta: {
                            title: '2024-09制度',
                            icon: 'Warning',
                            requireAuth: true,
                            hidden: false
                        },
                        component: () => import('../views/test/test9.vue'),
                    },
                ]
            },
            {
                path: '/practice',
                name: 'practice',
                meta: {
                    title: '接口练习',
                    icon: 'Warning',
                    requireAuth: true,
                    hidden: false
                },
                component: () => import('../views/practice/index.vue'),
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
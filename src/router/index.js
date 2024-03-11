
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/rotation',
            component: () => import('@/views/Rotation.vue')
        },
        {
            path: '/data',
            component: () => import('@/views/DataView.vue') // 数据可视化视图
        },
        {
            path: '/view',
            component: () => import('@/views/CityView.vue')
        },
        {
            path:'/chaxun',
            component:()=>import('@/views/chaxun.vue')
        },
        {
            path: '/inquire',
            component: () => import('@/views/InquireView.vue') // 地图查询工具视图
        },
        {
            path: '/measuringtools',
            component: () => import('@/views/measuringTools.vue') // 测量工具组件
        },
        {
            path: '/bridgeview',
            component: () => import('@/views/bridgeView.vue') // 桥梁工具组件
        },
        {
            path: '/navigation',
            component: () => import('@/views/navigation.vue') // 导航工具组件
        },
        {
            path: '/heatmap',
            component: () => import('@/views/heatMap.vue') // 热力图工具组件
        },
    ]
})

export default router

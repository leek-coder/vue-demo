import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import User from "../components/user/User";
import Auth from "../components/resource/Resource";
import Log from "../components/log/Log";
import Product from "../components/product/Product";
import Role from "../components/role/Role";
import Category from "../components/category/Category";
import NextCategory from "../components/category/NextCategory";
import GrandsonCategory from "../components/category/GrandsonCategory";
import ProductAdd from "../components/product/ProductAdd";
import Reports from "../components/reports/Reports";
import ProductBrand from "../components/brand/ProductBrand";
import ProductType from "../components/product/ProductType";
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login,
        meta:{
            title:'后台管理系统',
        }
    },
    {
        path: "/home",
        component: Home,
        redirect: "/welcome",
        children: [
            {path: "/welcome", component: Welcome},
            {path: "/user", component: User},
            {path:"/resource",component:Auth},
            {path:"/product",component:Product},
            {path:"/category",component:Category},
            {path:"/next/category",component:NextCategory},
            {path:"/grandson/category",component:GrandsonCategory},
            {path:"/product/add",component:ProductAdd},
            {path:"/type",component:ProductType},
            {path:"/brand",component:ProductBrand},
            {path:"/reports",component:Reports},
            {path:"/log",component:Log},
            {path:"/role",component:Role}
        ]

    }
]

const router = new VueRouter({
    routes
})
//全局导航守卫，配置路由的时候，加上meta元数据
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从哪里过来的
    //next 是一个函数，表示放行   next('/login') 强制执行
    if (to.path === '/login') return next();
    const token = localStorage.getItem("token");
    if (!token) return next('/login')
    next();
    document.title = '后台管理系统'
})

export default router

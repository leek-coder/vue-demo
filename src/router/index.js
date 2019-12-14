import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login";
import Home from "../components/Home";
import Welcome from "../components/Welcome";
import User from "../components/user/User";
Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: "/login",
        component: Login
    },
    {
        path: "/home",
        component: Home,
        redirect:"/welcome",
        children: [
            {path: "/welcome", component: Welcome},
            {path: "/user", component: User}
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
    // document.title = to.matched[0].meta.title;
})

export default router

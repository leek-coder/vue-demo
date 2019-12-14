import Vue from 'vue'
import
{Form,FormItem,Button,Input,Container,
    Breadcrumb,Header,Aside,Card,Main,BreadcrumbItem,
    Menu,MenuItem,Submenu} from "element-ui";
import {Message} from "element-ui";

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
//把弹窗组件挂载vue身上
Vue.prototype.$message=Message
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)

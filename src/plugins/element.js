import Vue from 'vue'
import
{Form,FormItem,Button,Input,Container,Tree,
    Breadcrumb,Header,Aside,Card,Main,BreadcrumbItem,
    Menu,MenuItem,Submenu,Row,Col,Table,Dialog,Select,Option,
    TableColumn,Tag,Tooltip,Pagination,Dropdown,DropdownMenu,DropdownItem} from "element-ui";
import {Message} from "element-ui";
import { MessageBox } from 'element-ui';

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
//把弹窗组件挂载vue身上
Vue.prototype.$message=Message
Vue.prototype.$confirm=MessageBox.confirm
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Dropdown)
Vue.use(Dialog)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tree)

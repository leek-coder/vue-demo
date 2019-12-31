import Vue from 'vue'
import
{
    Form, FormItem, Button, Input, Container, Tree, Badge, Avatar,Image,Steps,Step,
    Breadcrumb, Header, Aside, Card, Main, BreadcrumbItem, Upload,Cascader,Radio,RadioGroup,
    Menu, MenuItem, Submenu, Row, Col, Table, Dialog, Select, Option,Alert,Tabs,TabPane,
    TableColumn, Tag, Tooltip, Pagination, Dropdown, DropdownMenu, DropdownItem
} from "element-ui";
import {Message} from "element-ui";
import {MessageBox} from 'element-ui';
import  echarts  from  'echarts'
Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
//把弹窗组件挂载vue身上
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$echarts = echarts
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
Vue.use(Badge)
Vue.use(Upload)
Vue.use(Avatar)
Vue.use(Cascader)
Vue.use(Image)
Vue.use(Alert)
Vue.use(Step)
Vue.use(Steps)
Vue.use(TabPane)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(RadioGroup)

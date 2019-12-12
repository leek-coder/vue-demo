import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from "element-ui";
import {Input} from "element-ui";
import {Message} from "element-ui";

Vue.use(Button)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Form)
//把弹窗组件挂载vue身上
Vue.prototype.$message=Message

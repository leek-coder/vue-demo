import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./css/global.css"

Vue.config.productionTip = false

//注册全局的过滤器,进行日期转换
Vue.filter('dataFormat', function (originDate) {

    const date = new Date(originDate);
    let year = date.getFullYear();
    const month = (date.getMonth() + 1 + '').padStart(2, '0');
    const day = (date.getDate() + '').padStart(2, '0');
    return `${year}-${month}-${day}`;

})
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')


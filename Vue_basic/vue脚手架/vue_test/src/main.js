// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'

Vue.config.productionTip = false;

// 创建Vue实例
new Vue({
    render: h => h(App)
}).$mount("#container");
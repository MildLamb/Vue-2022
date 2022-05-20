// 引入Vue
import Vue from 'vue'
// 引入App组件
import MyApp from './App.vue'

Vue.config.productionTip = false;


// 创建Vue实例
const vm = new Vue({
    components: {
      MyApp
    },
    render: h => h(MyApp)
}).$mount("#container");
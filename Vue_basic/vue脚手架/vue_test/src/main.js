// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'

/**
 * 插件要在Vue实例对象创建之前先引入
 */
import plugins from "./plugins";

Vue.config.productionTip = false;

// 全局混入
/*import {mixMethods,myData} from "./mixin.js";
Vue.mixin(mixMethods);
Vue.mixin(myData);*/


// 使用插件
Vue.use(plugins);


// 创建Vue实例
new Vue({
    render: h => h(App)
}).$mount("#container");
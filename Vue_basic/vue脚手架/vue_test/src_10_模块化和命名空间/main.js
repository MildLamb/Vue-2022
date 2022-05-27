//引入Vue
import Vue from "vue";
//引入App
import App from './App';
// 引入Store
import store from "./store/index";

//关闭Vue的生产提示
Vue.config.productionTip = false;


const vm = new Vue({
    el: '#container',
    render: h => h(App),
    store: store
});
console.log(vm);


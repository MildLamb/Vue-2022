import Vue from "vue";
import App from "./App";
// 引入vue-router插件
import VueRouter from "vue-router";
// 引入路由器
import MyRouter from "./router/index";

Vue.config.productionTip = false;
// 使用 vue-router 插件
Vue.use(VueRouter);

new Vue({
    el: "#container",
    components: {
        App
    },
    render: h => h(App),
    // 把我的路由器交给路由配置项
    router: MyRouter
    // render: createElement => createElement("h1","NB")
});
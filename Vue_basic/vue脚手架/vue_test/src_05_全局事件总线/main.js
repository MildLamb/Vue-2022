import Vue from "vue";
import MyApp from "./App";

Vue.config.productionTip = false;

new Vue({
    el: "#container",
    components: {
        MyApp
    },
    render: h => h(MyApp),
    // 安装全局事件总线 $bus
    beforeCreate() {
        Vue.prototype.$bus = this;
    }
});
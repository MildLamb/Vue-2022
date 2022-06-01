import Vue from "vue";
import App from "./App";
// // 引入ElementUI组件库
// import ElementUI from "element-ui";
// // 引入ElementUI全部样式
// import "element-ui/lib/theme-chalk/index.css";

// 按需引用部分组件
import {Button,DatePicker} from "element-ui";

Vue.config.productionTip = false;

// 使用ElementUI
// Vue.use(ElementUI);

// 注册全局组件
Vue.component("El_Button",Button);
Vue.component("El_DatePicker",DatePicker);

new Vue({
    el: "#container",
    components: {
        App
    },
    render: h => h(App),
});
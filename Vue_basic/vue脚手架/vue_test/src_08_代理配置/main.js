import Vue from "vue";
import MyApp from "./App";

/**
 * 关于不同版本的Vue：
 *  1.vue.js 与 vue.runtime.xxx.js的区别
 *      (1). Vue.js是完整版的Vue，包含：核心功能 + 模板解析器
 *      (2). vue.runtime.xxx.js 是运行版的Vue，只包含：核心功能，没有模板解析器
 *
 *  2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
 *      render函数接收到的createElement函数参数去指定具体内容
 */
Vue.config.productionTip = false;

new Vue({
    el: "#container",
    components: {
        MyApp
    },
    render: h => h(MyApp)
});
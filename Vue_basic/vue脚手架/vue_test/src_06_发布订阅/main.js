import Vue from "vue";
import MyApp from "./App";

Vue.config.productionTip = false;

new Vue({
    el: "#container",
    components: {
        MyApp
    },
    render: h => h(MyApp)
});
<template>
    <div class="app">
        <h2>我是App组件(祖).{{name}} --- {{age}}岁</h2>
        <Son></Son>
    </div>
</template>

<script>
import Son from "@/components/Son";
import {reactive, toRefs,provide} from "vue";
export default {
    name: "App",
    components: {
        Son
    },
    setup(){
        let role = reactive({
            name: "kindred",
            age: 1500
        });

        /**
         * param1 给提供的数据起一个名字
         * param2 需要提供的数据
         */
        provide("my_role",role);

        return {
            ...toRefs(role)
        };
    }
}
</script>

<style>
    .app{
        background-color: gray;
        padding: 10px;
    }
</style>

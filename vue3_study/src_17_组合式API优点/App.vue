<template>
    <div class="app">
        <h2>我是App组件(祖).{{name}} --- {{age}}岁</h2>
        <button @click="test">点我测试hook传过来的方法</button>
    </div>
</template>

<script>
import {reactive, toRefs, provide, ref, readonly, isRef, isReactive, isReadonly, isProxy, shallowReadonly} from "vue";
import {name as roleName,hello} from "./hooks/test";
export default {
    name: "App",
    setup(){
        let role = reactive({
            name: "gnar",
            age: 1500
        });

        let num = ref(127);

        let role2 = shallowReadonly(role);

        function test(){
            // alert(role.name);
            // 这里接收hook的name也没关系，但是尽量还是做区分
            alert(roleName);
            hello();
        }

        /**
         * param1 给提供的数据起一个名字
         * param2 需要提供的数据
         */
        provide("my_role",role);
        console.log(isReadonly(role2));

        return {
            ...toRefs(role),
            num,
            role2,
            test
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

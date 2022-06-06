<template>
    <h3>当前num的值为：{{num}}</h3>
    <button @click="num++">点击num++</button>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>位置：{{job.type1.name}}</h2>
    <button @click="name += '咩~'">修改命名</button>
    <button @click="age++">增长年龄</button>
    <button @click="job.type1.name += '射手'">修改位置</button>
</template>

<script>
import {reactive, toRefs, ref, readonly, shallowReadonly} from "vue";
export default {
    name: "Demo",
    setup(){
         let role = reactive({
            name: "千珏",
            age: 1500,
            job: {
                type1: {
                    name: "打野"
                },
                type2: {
                    name: "大乱斗"
                }
            }
        })

        let num = ref(0);

        // role = readonly(role);
        role = shallowReadonly(role);


        return {

            // toRefs写法
            ...toRefs(role),
            num
        }
    }
}
</script>

<style>

</style>
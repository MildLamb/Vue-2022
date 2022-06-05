<template>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>位置：{{job.type1.name}}</h2>
    <button @click="name += '咩~'">修改命名</button>
    <button @click="age++">增长年龄</button>
    <button @click="job.type1.name += '射手'">修改位置</button>
</template>

<script>
import {reactive,toRef,toRefs} from "vue";
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

/*
        const name1= role.name;
        console.log(name1);
*/

        /**
         * param1 从哪个对象中获取
         * param2 获取哪个属性
         */
        const name2 = toRef(role,'name');
        console.log(name2);


        const a_Role = toRefs(role);
        console.log(a_Role);

        return {
            // toRef写法
/*            name: toRef(role,"name"),
            age: toRef(role,"age"),
            jobName: toRef(role.job.type1,"name")*/

            // toRefs写法
            ...toRefs(role)
        }
    }
}
</script>

<style>

</style>
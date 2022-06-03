<template>
    <h2>当前求和为：{{sum}}</h2>
    <button @click="sum++">点我sum+1</button>
    <h2>当前的信息为：{{msg}}</h2>
    <button @click="msg += '!'">修改信息</button>
    <h2>姓名：{{role.name}}</h2>
    <h2>年龄：{{role.age}}</h2>
    <h2>位置：{{role.job.type1.name}}</h2>
    <button @click="role.name += '咩~'">修改命名</button>
    <button @click="role.age++">增长年龄</button>
    <button @click="role.job.type1.name += '射手'">修改位置</button>
</template>

<script>
import {ref,watch,reactive} from "vue";
export default {
    name: "Demo",
    /*  Vue2 的监视属性
    watch: {
        // 简写形式
        /!*sum(newV,oldV){
            console.log("sum的值变了");
        }, *!/

        // 完整写法
        /!*sum: {
            handler(newV,oldV){
                console.log("sum的值变化了")
            },
            immediate: true,
            deep: true
        }*!/
    },*/
    setup(){
        let sum = ref(0);
        let msg = ref("你好呀!");
        let role = ref({
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

        watch(sum,(newV,oldV)=>{
            console.log("sum的值变化了",newV,oldV);
        })

        watch(role,(newV,oldV)=>{
            console.log("role的值变化了",newV,oldV);
        },{deep: true})


        return {
            sum,
            msg,
            role
        }
    }
}
</script>

<style>

</style>
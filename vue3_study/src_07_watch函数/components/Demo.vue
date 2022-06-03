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

        // 情况一：监视ref所定义的一个响应式数据
        /*watch(sum,(newV,oldV)=>{
            console.log("sum的值变化了，新值为：" + newV + ",旧值为：" + oldV);
        },{immediate: true,deep: true})*/

        // 情况二：监视ref所定义的多个响应式数据
        /*watch([sum,msg],(newV,oldV)=>{
            console.log("sum的值变化了" ,newV ,oldV);
        })*/

        // 情况三：监视reactive定义的一个响应式数据的全部属性
        /**
         * 注意：
         *  1. 此处无法正确的获取oldV的值，原因可能是对象监视的是地址值
         *  2. 强制开启了深度监视  {deep: true} 无效
         */
/*        watch(role,(newV,oldV)=>{
            console.log("role变化了",newV,oldV);
        })*/

        // 情况四：监视reactive所定义的一个响应式数据中的某一个属性
        /*watch(()=>role.age,(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        })*/


        // 情况五：监视reactive所定义的一个响应式数据中的某些属性
/*        watch([()=>role.age,()=>role.name],(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        })*/

        // 特殊情况：监视reactive所定义的一个响应式数据中的某个深度对象中的属性
        watch(()=>role.job,(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        },{deep:true})


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
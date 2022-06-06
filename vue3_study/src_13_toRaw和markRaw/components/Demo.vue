<template>
    <h3>当前num的值为：{{num}}</h3>
    <button @click="num++">点击num++</button>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>位置：{{job.type1.name}}</h2>
    <h2 v-if="fri.name">朋友：{{fri}}</h2>
    <button @click="name += '咩~'">修改命名</button>
    <button @click="age++">增长年龄</button>
    <button @click="job.type1.name += '射手'">修改位置</button>
    <button @click="showRawRole">输出原始的role对象</button>
    <button @click="addFri">给角色添加一个朋友</button>
    <button @click="changeFriName">换名字</button>
    <button @click="fri.age++">加年龄</button>
</template>

<script>
import {reactive, toRefs, ref, toRaw, markRaw} from "vue";
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
            },
             fri: {}
        })

        let num = ref(127);

        function showRawRole(){
            // toRow() 将一个响应式对象转变为普通对象
            const r = toRaw(role);
            console.log(r);
            /*const n = toRaw(num);
            console.log(n);*/
        }

        function addFri(){
            let fri = {name:"狼灵",age:1500};
            // markRaw() 标记一个普通对象，该对象无法变为响应式对象,数据改了但是不再拥有响应式
            role.fri = markRaw(fri);
        }

        function changeFriName(){
            role.fri.name += "灵";
            console.log(role.fri.name);
        }

        return {

            // toRefs写法
            ...toRefs(role),
            num,
            showRawRole,
            addFri,
            changeFriName
        }
    }
}
</script>

<style>

</style>
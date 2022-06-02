<template>
    <h1>角色信息</h1>
    <h2>姓名:{{role.name}}</h2>
    <h2 v-show="role.level">等级:{{role.level}}</h2>
    <h2>位置:{{role.role_info.job}}</h2>
    <h2 v-show="role.sex">性别:{{role.sex}}</h2>
    <h2>是一只{{role.role_info.age}}岁的{{role.role_info.type.name}}</h2>
    <button @click="addSex">添加一个sex属性</button>
    <button @click="delLevel">删除熟练度等级</button>
    <ul>
        <li v-for="(hobby,index) in role.hobbies" :key="index">{{hobby}}</li>
    </ul>
    <button @click="changeInfo">修改珏色信息</button>
</template>

<script>
import {ref,reactive} from 'vue';
export default {
    name: 'App',
    setup(){
        let role = reactive({
            name: "千珏",
            level: 5,
            role_info: {
                job: "打野",
                age: 1500,
                type: {
                    name: "射手",
                    ename: "ADC"
                }
            },
            hobbies: ["陪狼说话","唱歌","捉迷藏"]
        })

        function addSex(){
            role.sex = "女";
        }

        function delLevel(){
            delete(role.level);
        }

        function sayHello(){
            alert(`我叫${name},你也可以叫我${level},我已经${age}岁了哦,我们的熟练等级是：${this.level}`);
            console.log(this.showInfo());
        }

        function changeInfo(){
            role.hobbies[0] = "陪我和狼说话";
        }

        return {
            role,
            sayHello,
            changeInfo,
            addSex,
            delLevel
        }
    }
}
</script>

<style>

</style>

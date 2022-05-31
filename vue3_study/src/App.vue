<template>
    <h1>角色信息</h1>
    <h2>姓名:{{name}}</h2>
    <h2>等级:{{level}}</h2>
    <h2>位置:{{role_info.job}}</h2>
    <h2>是一只{{role_info.age}}岁的{{role_info.type.name}}</h2>
    <button @click="changeInfo">修改珏色信息</button>
</template>

<script>
import {ref} from 'vue';
export default {
    name: 'App',
    setup(){
        // 数据
        let name = ref("千珏")
        let level = ref(5)
        let role_info = ref({
            job: "打野",
            age: 1500,
            type: {
                name: "射手",
                ename: "ADC"
            }
        })

        function sayHello(){
            alert(`我叫${name},你也可以叫我${level},我已经${age}岁了哦,我们的熟练等级是：${this.level}`);
            console.log(this.showInfo());
        }

        function changeInfo(){
            name.value = "永猎双子";
            level.value = 7;
            role_info.value.job = "大乱斗";
            role_info.value.type.name = "猎人";
        }

        return {
            name,
            level,
            sayHello,
            changeInfo,
            role_info
        }
    }
}
</script>

<style>

</style>

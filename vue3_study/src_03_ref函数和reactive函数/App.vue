<template>
    <h1>角色信息</h1>
    <h2>姓名:{{role.name}}</h2>
    <h2>等级:{{role.level}}</h2>
    <h2>位置:{{role.role_info.job}}</h2>
    <h2>是一只{{role.role_info.age}}岁的{{role.role_info.type.name}}</h2>
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
        // 数据
        // 麻烦的写法，直接使用reactive包裹对象
        /*let name = ref("千珏")
        let level = ref(5)
        let role_info = reactive({
            job: "打野",
            age: 1500,
            type: {
                name: "射手",
                ename: "ADC"
            }
        })
        let hobbies = reactive(["陪狼说话","唱歌","捉迷藏"]);*/

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

        function sayHello(){
            alert(`我叫${name},你也可以叫我${level},我已经${age}岁了哦,我们的熟练等级是：${this.level}`);
            console.log(this.showInfo());
        }

        function changeInfo(){
            // name.value = "永猎双子";
            // level.value = 7;
            // console.log(role_info);
            // role_info.job = "乱斗";
            // role_info.type.name = "灵魂猎人";
            role.hobbies[0] = "陪我和狼说话";
            // ref 版修改
            // role_info.value.job = "大乱斗";
            // role_info.value.type.name = "猎人";
        }

        return {
            role,
            sayHello,
            changeInfo,


            /*name,
            level,
            sayHello,
            changeInfo,
            role_info,
            hobbies*/
        }
    }
}
</script>

<style>

</style>

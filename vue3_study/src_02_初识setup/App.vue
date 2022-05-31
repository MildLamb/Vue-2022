<template>
    <h1>角色信息</h1>
    <h2>姓名:{{name}}</h2>
    <h2>外号:{{title}}</h2>
    <h2>熟练等级:{{level}}</h2>
    <h2>召唤师是:{{master}}</h2>
    <button @click="sayHello">简单介绍</button>
    <button @click="showInfo">熟练度信息</button>
</template>

<script>
// import {h} from 'vue'
export default {
    name: 'App',
    // 此处只是测试一下setup，暂时不考虑响应式的问题
    setup(){
        // 数据
        let name = "千珏"
        let otherN = "死亡之灵"
        let age = 1500
        let master = "QSJ"

        // 方法
        /**
         * Vue3 setup中无法访问 Vue2 形式写的数据和方法
         */
        function sayHello(){
            alert(`我叫${name},你也可以叫我${otherN},我已经${age}岁了哦,我们的熟练等级是：${this.level}`);
            console.log(this.showInfo());
        }

        return {
            name,
            title: otherN,
            sayHello,
            master
        }

        // 渲染函数写法，了解
        // return () => h("h1","欢迎光临");
    },
    data(){
        return {
            level: 7,
            master: "qsj"
        }
    },
    methods: {
        /**
         * Vue2可以访问Vue3中setup中的数据
         */
        showInfo(){
            alert(`${this.name}的熟练等级为：${this.level}`);
            console.log(this.sayHello);
        }
    }
}
</script>

<style>

</style>

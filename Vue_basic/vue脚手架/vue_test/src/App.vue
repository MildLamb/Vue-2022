<template>
    <div class="app">
        <Master></Master>
        <MyRole></MyRole>
    </div>
</template>

<script>
    // 引入组件
    import Master from "./components/Master";
    import MyRole from "./components/Role";

    export default {
        name: "MyApp",
        components: {
            Master,
            MyRole
        },
        data(){
            return {
                msg: "你好鸭!",
                masterName: ""
            }
        }
    }
</script>

<style scoped>
    .app {
        background-color: blueviolet;
        padding: 5px;
    }
</style>
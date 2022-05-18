<template>
    <div>
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
        }
    }
</script>

<style scoped>

</style>
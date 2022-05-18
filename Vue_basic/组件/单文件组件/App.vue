<template>
    <div>
        <Master></Master>
        <Role></Role>
    </div>
</template>

<script>
    // 引入组件
    import Master from "./Master";
    import Role from "./Role";

    export default {
        name: "App",
        components: {
            Master,
            Role
        }
    }
</script>

<style scoped>

</style>
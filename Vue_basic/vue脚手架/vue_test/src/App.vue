<template>
    <div>
        <h1 v-text="msg" ref="title"></h1>
        <button @click="showDom" ref="btn">点我显式上方DOM</button>
        <Master ref="master"></Master>
        <Role></Role>
    </div>
</template>

<script>
import Master from "@/components/Master";
import Role from "@/components/Role";
export default {
    name: "App",
    components: {
        Master,
        Role
    },
    data(){
        return {
            msg: "欢迎光临!"
        }
    },
    methods: {
        showDom(){
            console.log(this.$refs.title);
            console.log(this.$refs.btn);
            console.log(this.$refs.master);
        }
    }
}
</script>

<style scoped>

</style>
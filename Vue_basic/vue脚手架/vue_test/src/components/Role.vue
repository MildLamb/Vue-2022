<template>
    <!--  组件的结构  -->
    <div class="role">
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age}}</h2>
        <button @click="sendRoleName">把角色名给Master组件</button>
    </div>
</template>
<script>
    export default {
        name: "Role",
        data(){
            return {
                name: "kindred",
                age: 1500
            }
        },
        methods: {
            sendRoleName() {
                this.$bus.$emit("hello",this.name);
            }
        }
    };
</script>
<style>
    /*组件的样式*/
    .role{
        background-color: aqua;
    }
</style>
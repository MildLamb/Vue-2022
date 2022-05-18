<template>
    <!--  组件的结构  -->
    <div class="role">
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age}}</h2>
        <button @click="showInfo"></button>
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
            showInfo(){
                alert(this.name);
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
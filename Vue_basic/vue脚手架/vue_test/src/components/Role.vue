<template>
    <!--  组件的结构  -->
    <div class="role">
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age}}</h2>
    </div>
</template>
<script>
export default {
    name: "Role",
    data(){
        return {
            name: "千珏",
            age: 1500
        }
    }
}
</script>
<style>
    /*组件的样式*/
    .role{
        background-color: aqua;
    }
</style>
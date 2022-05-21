<template>
    <!--  组件的结构  -->
    <div class="role">
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age}}</h2>
        <button @click="sendRoleName">显式MasterName</button>
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
            sendRoleName(){
                // 触发Role组件(组件标签名为MyRole)实例身上的kind事件
                this.$emit("kind",this.name,this.age,true,127);
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
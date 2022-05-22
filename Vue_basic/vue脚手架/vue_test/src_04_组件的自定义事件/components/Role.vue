<template>
    <!--  组件的结构  -->
    <div class="role">
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age}}</h2>
        <button @click="sendRoleName">显式MasterName</button>
        <button @click="cancelMethods">Role组件上取消自定义事件绑定</button>
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
            },
            cancelMethods(){
                // 解绑某一个自定义事件
                // this.$off("kind");
                // 解绑多个自定义事件
                // this.$off(["kind","demo"]);
                // 解绑所有自定义事件
                // this.$off();
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
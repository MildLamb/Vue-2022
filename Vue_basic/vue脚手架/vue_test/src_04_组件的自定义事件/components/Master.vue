<template>
    <div class="master">
        <h2>用户名称：{{name}}</h2>
        <h2>用户年龄：{{age}}</h2>
        <button @click="sendMasterName">显式MasterName</button>
    </div>
</template>

<script>
    export default {
        name: "MyMaster",
        data(){
            return {
                name: "QSJ",
                age: 23
            }
        },
        props: ["getMasterName"],
        methods: {
            sendMasterName(){
                this.getMasterName(this.name);
            }
        }
    }
</script>

<style scoped>
    .master{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
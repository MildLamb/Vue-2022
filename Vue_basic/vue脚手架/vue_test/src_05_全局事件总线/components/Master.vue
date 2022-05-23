<template>
    <div class="master">
        <h2>用户名称：{{name}}</h2>
        <h2>用户年龄：{{age}}</h2>
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
        methods: {
            getRoleName(name){
                console.log("Master组件，收到数据：" + name);
            }
        },
        mounted() {
            // console.log("Master",this.x);
            /*this.$bus.$on("hello",(data)=>{
                console.log("Master组件，收到数据：" + data);
            });*/
            this.$bus.$on("hello",this.getRoleName);
        },
        beforeDestroy() {
            this.$bus.$off("hello");
        }
    }
</script>

<style scoped>
    .master{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
<template>
    <div class="master">
        <h2>用户名称：{{name}}</h2>
        <h2>用户年龄：{{age}}</h2>
    </div>
</template>

<script>
    import pubsub from "pubsub-js"
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
            // this.$bus.$on("hello",this.getRoleName);

            /**
             * 消息的订阅与发布：首先借助第三方js库 npm i pubsub-js
             * 导入 pubsub 对象
             * 订阅消息:
             *      pubsub.subscribe(eventName,形参)
             */
            this.pubId = pubsub.subscribe("hello",(eventName,args)=>{
                console.log(this);
                console.log("有人发布了hello消息，hello消息的回调执行了,带来了参数：" + args);
            })
        },
        beforeDestroy() {
            // this.$bus.$off("hello");
            // 取消订阅
            pubsub.unsubscribe(this.pubId);
        }
    }
</script>

<style scoped>
    .master{
        background-color: aquamarine;
        padding: 5px;
    }
</style>
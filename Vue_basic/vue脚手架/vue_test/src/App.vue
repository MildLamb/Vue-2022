<template>
    <div class="app">
        <h1>{{msg}}</h1>
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <Master :getMasterName="getMasterName"></Master>
        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法，使用@或v-on绑定事件) -->
<!--        <MyRole v-on:kind="myMethod"></MyRole>-->

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法，使用ref绑定事件) -->
        <MyRole ref="my_role"></MyRole>
    </div>
</template>

<script>
    // 引入组件
    import Master from "./components/Master";
    import MyRole from "./components/Role";
    // import mitt from "@/mitt";

    export default {
        name: "MyApp",
        components: {
            Master,
            MyRole
        },
        data(){
            return {
                msg: "你好鸭!"
            }
        },
        methods: {
            getMasterName(name){
                console.log("App接收到了Master的名字：" + name);
            },
            myMethod(name,...params){
                console.log("App接收到Role的名字" + name,"其他参数保存在数组args中:" + params);
            }
        },
        mounted() {
            this.$refs.my_role.$on("kind",this.myMethod);
        }
    }
</script>

<style scoped>
    .app {
        background-color: blueviolet;
        padding: 5px;
    }
</style>
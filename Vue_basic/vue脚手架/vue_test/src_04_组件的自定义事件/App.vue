<template>
    <div class="app">
        <h1>{{msg}},角色名是{{masterName}}</h1>
        <!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
        <Master :getMasterName="getMasterName" @click.native="show"></Master>
        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第一种写法，使用@或v-on绑定事件) -->
<!--        <MyRole v-on:kind="myMethod"></MyRole>-->

        <!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据(第二种写法，使用ref绑定事件) -->
        <MyRole ref="my_role"></MyRole>
        <button @click="cancelMethods">取消自定义事件绑定</button>
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
                msg: "你好鸭!",
                masterName: ""
            }
        },
        methods: {
            getMasterName(name){
                console.log("App接收到了Master的名字：" + name);
            },
/*            myMethod(name,...params){
                console.log("App接收到Role的名字" + name,"其他参数保存在数组args中:" + params);
                this.masterName = name;
            },*/
            cancelMethods(){
                this.$refs.my_role.$off("kind");
            },
            show(){
                alert("组件中的事件都被当成了自定义事件");
            }
        },
        mounted() {
            // 绑定自定义事件
            // this.$refs.my_role.$on("kind",this.myMethod);
            /**
             * 如果你想把触发事件的回调函数直接以匿名回调的形式写在 $on 参数中
             * 如果你使用 function(){} 形式，那么这里的this是触发事件的组件实例对象，也就是 MyRole
             * 如果你使用 ()=>{} 的形式，那么这里的 this 是外面钩子函数的this也就是当前的组件实例对象，也就是App
             */
            /*this.$refs.my_role.$on("kind",function (name,...params){
                console.log("App接收到Role的名字" + name,"其他参数保存在数组args中:" + params);
                this.masterName = name;
            });*/
            this.$refs.my_role.$on("kind",(name,...params) => {
                console.log("App接收到Role的名字" + name,"其他参数保存在数组args中:" + params);
                this.masterName = name;
            });
        }
    }
</script>

<style scoped>
    .app {
        background-color: blueviolet;
        padding: 5px;
    }
</style>
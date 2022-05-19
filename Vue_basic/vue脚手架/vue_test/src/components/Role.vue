<template>
    <!--  组件的结构  -->
    <div class="role">
        <h1 v-text="msg"></h1>
        <h2>角色名称：{{name}}</h2>
        <h2>角色年龄：{{age+1}}</h2>
    </div>
</template>
<script>
export default {
    name: "Role",
    data(){
        return {
            msg: "我们是灵魂的指路人"
        }
    },
    props: ["name","age"] // 简单声明接收

    // 接收的同时对数据类型进行限制
    /*props: {
        name: String,
        age: Number
    }*/

    // 接收的同时对数据进行类型限制，以及默认值，必要性的限制
    /*props: {
        name: {
            type: String,   // name的类型
            required: true  // name是必要的
        },
        age: {
            type: Number,
            default: "?"
        }
    }*/
}
</script>
<style>
    /*组件的样式*/
    .role{
        background-color: aqua;
    }
</style>
<template>
    <div class="son">
        <h3>我是子组件Son(子)</h3>
        <button @click="doEvent">调用父组件传递的自定义事件</button>
    </div>
</template>

<script>

export default {
    name: "Son",
    components: {
    },
    emits: ["kindred"], // 先声明
    setup(props,context){
        console.log(props,context);

       /* const doEvent = () => {
            context.emit('kindred',"I Love Kindred") // 然后定义事件以及传值
        }*/

        function doEvent(){
            context.emit('kindred',"I Love Kindred") // 然后定义事件以及传值
        }

        return {
            doEvent
        }
    }
}
</script>

<style scoped>
    .son{
        background-color: #5bc0de;
        padding: 10px;
    }
</style>
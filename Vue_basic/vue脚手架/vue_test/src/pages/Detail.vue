<template>
    <ul>
        <li>消息编号：{{$route.params.rid}}</li>
        <li>消息内容：{{$route.params.title}}</li>
        <li>rid: {{rid}}</li>
        <li>title: {{title}}</li>
    </ul>
</template>

<script>
export default {
    name: "Detail",
    props: ["rid","title"],
    mounted(){
        // 组件相关的路由配置信息
        console.log(this.$route);
    }
}
</script>

<style scoped>

</style>
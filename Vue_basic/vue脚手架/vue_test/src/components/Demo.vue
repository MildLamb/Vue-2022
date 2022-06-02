<template>
    <div class="demo">
        <h2>我是Demo组件</h2>
        <slot name="first"></slot>
        <slot name="second"></slot>
    </div>
</template>

<script>
export default {
    name: "Demo",
    props: ["msg","master"],
    mounted() {
        console.log(this);
    }
}
</script>

<style scoped>
    .demo {
        background-color: orange;
        padding: 10px;
    }
</style>
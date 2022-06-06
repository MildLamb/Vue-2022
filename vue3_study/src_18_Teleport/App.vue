<template>
    <div class="app">
        <h2>我是App组件(祖)</h2>
        <Son></Son>
    </div>
</template>

<script>
import Son from "@/components/Son";
export default {
    name: "App",
    components: {
        Son
    }
}
</script>

<style>
    .app{
        background-color: gray;
        padding: 10px;
    }
</style>

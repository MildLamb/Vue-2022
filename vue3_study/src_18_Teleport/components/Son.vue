<template>
    <div class="son">
        <h3>我是子组件Son(子)</h3>
        <Grandson></Grandson>
    </div>
</template>

<script>
import Grandson from "@/components/Grandson";

export default {
    name: "Son",
    components: {
        Grandson
    }
}
</script>

<style scoped>
    .son{
        background-color: #5bc0de;
        padding: 10px;
    }
</style>
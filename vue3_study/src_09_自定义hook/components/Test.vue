<template>
    <h2>我是Test组件</h2>

</template>

<script>
import usePoint from "@/hooks/usePoint";
export default {
    name: "Test",
    setup(){
        const point = usePoint();
    }
}
</script>

<style scoped>

</style>
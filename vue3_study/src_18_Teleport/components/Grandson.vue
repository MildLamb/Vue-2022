<template>
    <div class="grandson">
        <h4>我是孙组件Grandson(孙)</h4>
        <Dialog></Dialog>
    </div>
</template>

<script>
import Dialog from "@/components/Dialog";
export default {
    name: "Grandson",
    components: {Dialog},
}
</script>

<style scoped>
    .grandson{
        background-color: #d58512;
        padding: 10px;
    }
</style>
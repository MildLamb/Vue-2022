<template>
    <div>
        <h2>Vue2写的效果</h2>
        <Demo msg="你好呀" master="QSJ">
            <template v-slot:first>
                <span>千珏</span>
            </template>
            <template v-slot:second>
                <span>永猎双子 - 千珏</span>
            </template>
        </Demo>
    </div>
</template>

<script>
import Demo from "@/components/Demo";
export default {
    name: "App",
    components: {
        Demo
    }
}
</script>

<style>

</style>
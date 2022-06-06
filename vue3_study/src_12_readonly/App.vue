<template>
    <Demo></Demo>
    <h2></h2>
</template>

<script>
import Demo from "@/components/Demo";
import {ref} from 'vue';
export default {
    name: "App",
    components: {
        Demo
    },
    setup(){
        let isShowDemo = ref(true)
        return {
            isShowDemo
        }
    }
}
</script>

<style>

</style>

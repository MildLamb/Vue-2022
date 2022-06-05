<template>
    <button @click="isShowDemo = !isShowDemo">切换隐藏/显式</button>
    <Demo v-if="isShowDemo"></Demo>
    <h2></h2>
    <Test></Test>
</template>

<script>
import Demo from "@/components/Demo";
import Test from "@/components/Test";
import {ref} from 'vue';
export default {
    name: "App",
    components: {
        Test,
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

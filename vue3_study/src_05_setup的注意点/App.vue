<template>
    <Demo msg="你好啊" name="千珏" @hello="showHelloMsg">
        <template v-slot:gnar>
            <span>纳尔</span>
        </template>
        <template v-slot:kindred>
            <span>千珏</span>
        </template>
    </Demo>
</template>

<script>
import Demo from "@/components/Demo";
export default {
    name: "App",
    components: {
        Demo
    },
    setup(){
        function showHelloMsg(value){
            alert(`你好啊，刚刚触发了自定义hello事件，收到的参数为${value}`);
        }

        return {
            showHelloMsg
        }
    }
}
</script>

<style>

</style>

<template>
    <div class="app">
        <h2>我是App组件(祖)</h2>
        <Son @kindred="customEvent"></Son>
<!--        <Suspense>
            <template v-slot:default>
                <Son></Son>
            </template>
            <template v-slot:fallback>
                <h3>Loading...</h3>
            </template>
        </Suspense>-->
    </div>
</template>

<script>
// import Son from "@/components/Son";  // 静态引入
// 引入异步组件
import {defineAsyncComponent} from "vue";
const Son = defineAsyncComponent(()=>import("@/components/Son"))  // 动态，异步引入

export default {
    name: "App",
    components: {
        Son
    },
    setup(){
        const customEvent = (data) => {
            alert(data);
        }

        return {
            customEvent
        }
    }
}
</script>

<style>
    .app{
        background-color: gray;
        padding: 10px;
    }
</style>

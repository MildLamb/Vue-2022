<template>
    <div class="son">
        <h3>我是子组件Son(子),我收到了祖传的名字：{{role_info["name"]}}</h3>
        <Grandson></Grandson>
    </div>
</template>

<script>
import Grandson from "@/components/Grandson";
import {inject} from "vue";

export default {
    name: "Son",
    components: {
        Grandson
    },
    setup(){
        /**
         * param1 你需要哪个数据(数据的名字)
         */
        let role_info = inject("my_role");
        console.log(role_info);
        console.log(role_info["name"]);

        return {
            role_info
        }
    }
}
</script>

<style scoped>
    .son{
        background-color: #5bc0de;
        padding: 10px;
    }
</style>
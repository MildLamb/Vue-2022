<template>
    <div class="grandson">
        <h4>我是孙组件Grandson(孙),我收到祖传的年龄：{{role_age.age}}</h4>
    </div>
</template>

<script>
import {inject} from "vue";

export default {
    name: "Grandson",
    setup(){
        let role_age = inject("my_role");

        return {
            role_age
        }
    }
}
</script>

<style scoped>
    .grandson{
        background-color: #d58512;
        padding: 10px;
    }
</style>
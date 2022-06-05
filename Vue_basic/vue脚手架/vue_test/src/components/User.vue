<template>
    <div>
        <h2 @click="showInfo">用户名：{{name}}</h2>
    </div>
</template>

<script>
import {mixMethods} from "@/mixin";
export default {
    name: "User",
    data(){
        return {
            name: "MildLamb"
        }
    }
    // mixins: [mixMethods]
}
</script>

<style scoped>

</style>
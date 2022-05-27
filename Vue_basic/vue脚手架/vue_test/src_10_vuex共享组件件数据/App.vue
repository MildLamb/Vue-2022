<template>
    <div class="container">
        <Count></Count>
        <hr>
        <Role></Role>
    </div>
</template>

<script>

import Count from "@/components/Count";
import Role from "@/components/Role";

export default {
    name: "App",
    components: {
        Count,
        Role
    }
}
</script>


<style scoped>

</style>

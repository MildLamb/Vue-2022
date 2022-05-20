<template>
    <div>
        <Master ref="master"></Master>
<!--        <Role name="kindred" :age="1500"></Role>
        <Role name="gnar" :age="8"></Role>-->
<!--        <User></User>-->
    </div>
</template>

<script>
import Master from "@/components/Master";
import Role from "@/components/Role";
import User from "@/components/User";
export default {
    name: "App",
    components: {
        Master,
        Role,
        User
    }
}
</script>

<style scoped>

</style>
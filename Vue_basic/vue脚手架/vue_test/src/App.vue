<template>
    <div className="container">
        <Search/>
        <UserList/>
    </div>
</template>

<script>
import Search from "@/components/Search";
import UserList from "@/components/UserList";

export default {
    name: "App",
    components: {
        Search,
        UserList
    }
}
</script>


<style>
</style>

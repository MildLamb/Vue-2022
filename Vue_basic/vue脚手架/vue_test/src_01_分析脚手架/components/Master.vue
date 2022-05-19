<template>
    <div>
        <h2>用户名称：{{name}}</h2>
        <h2>用户年龄：{{age}}</h2>
    </div>
</template>

<script>
    export default {
        name: "MyMaster",
        data(){
            return {
                name: "QSJ",
                age: 23
            }
        }
    }
</script>

<style scoped>

</style>
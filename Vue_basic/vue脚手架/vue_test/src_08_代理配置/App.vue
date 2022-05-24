<template>
    <div>
        <button @click="getUsers">获取用户信息</button>
        <button @click="getMasters">获取Master信息</button>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "MyApp",
        methods: {
            getUsers(){
                axios.get("http://localhost:8080/info/users").then(
                    response => {
                        console.log("请求成功了!");
                        console.log(response.data);
                    },
                    error => {
                        console.log("请求失败了：" + error.message);
                    }
                )
            },
            getMasters(){
                axios.get("http://localhost:8080/m_info/master").then(
                    response => {
                        console.log("请求成功了!");
                        console.log(response.data);
                    },
                    error => {
                        console.log("请求失败了：" + error.message);
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>
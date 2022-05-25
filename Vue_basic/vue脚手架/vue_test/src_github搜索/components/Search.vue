<template>
    <section class="jumbotron">
        <h3 class="jumbotron-heading">Search Github Users</h3>
        <div>
            <input type="text" placeholder="enter the name you search" v-model="keyWord"/>&nbsp;
            <button @click="getUsers">Search</button>
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: "Search",
    data(){
        return {
            keyWord: ""
        }
    },
    methods: {
        getUsers(){
            // 请求前更新list的状态
            this.$bus.$emit("updateUserList",{isFirst:false,isLoading:true,errMsg:"",users:[]});
            axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
                response => {
                    console.log("请求成功了");
                    this.$bus.$emit("updateUserList",{isLoading:false,errMsg:"",users:response.data.items});
                },
                error => {
                    console.log("请求失败了");
                    this.$bus.$emit("updateUserList",{isLoading:false,errMsg:error.message,users:[]});
                }
            )
        }
    }
}
</script>

<style scoped>
.jumbotron > h3,div{
    margin-left: 50px;
}
</style>
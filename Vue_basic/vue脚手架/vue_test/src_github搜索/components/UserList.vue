<template>
    <div class="row">
        <!--展示用户列表-->
        <div class="card" v-for="user in userInfo.users" :key="user.id" v-show="userInfo.users.length">
            <a target="_blank" :href="user.html_url">
                <img :src="user.avatar_url" style='width: 100px'/>
            </a>
            <p class="card-text">{{user.login}}</p>
        </div>
        <!---欢迎词-->
        <h1 v-show="userInfo.isFirst">Welcome!</h1>
        <!--加载中--->
        <h1 v-show="userInfo.isLoading">Loading...</h1>
        <!---错误信息-->
        <h1 v-show="userInfo.errMsg">{{userInfo.errMsg}}</h1>
    </div>
</template>

<script>
export default {
    name: "UserList",
    data(){
        return {
            userInfo: {
                users: [],
                isFirst: true,
                isLoading: false,
                errMsg: ""
            }
        }
    },
    mounted() {
        this.$bus.$on("updateUserList",(listStateObj)=>{
            this.userInfo = {...this.userInfo,...listStateObj};
        })
    }
}
</script>

<style scoped>
.album {
    min-height: 50rem; /* Can be removed; just added for demo purposes */
    padding-top: 3rem;
    padding-bottom: 3rem;
    background-color: #f7f7f7;
}
.card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
}
.card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
}
.card-text {
    font-size: 85%;
}
</style>
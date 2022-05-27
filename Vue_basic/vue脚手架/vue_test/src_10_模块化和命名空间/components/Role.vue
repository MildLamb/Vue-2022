<template>
    <div>
        <h1>上方Count组件共享的求和值为：{{countSum}}</h1>
        <h1>角色列表</h1>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="addRole">添加</button>
        <h1>列表中第一个人的名字是：{{firstRoleName}}</h1>
        <h1>服务器给我这次请求回的话：{{serverResponse}}</h1>
        <ul>
            <li v-for="role in roles" :key="roles.id">{{role.name}}</li>
        </ul>
    </div>
</template>

<script>
import {nanoid} from "nanoid";
import {mapState} from "vuex";
export default {
    name: "Role",
    data(){
        return {
            name: ""
        }
    },
    computed: {
        roles: {
            get(){
                return this.$store.state.roleAbout.roleList;
            }
        },
        countSum(){
            return this.$store.state.countAbout.sum;
        },
        firstRoleName(){
            return this.$store.getters["roleAbout/firstRoleName"];
        },
        serverResponse(){
            return this.$store.state.roleAbout.response;
        }
    },
    methods: {
        addRole(){
            const newRole = {
                id: nanoid(),
                name: this.name
            }
            this.$store.dispatch("roleAbout/addRoleJue",newRole);
        },
        getWords() {
            this.$store.dispatch("roleAbout/getServeResponse");
        }
    },
    mounted() {
        this.getWords();
    }
}
</script>

<style scoped>

</style>
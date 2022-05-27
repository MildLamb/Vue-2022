<template>
    <div>
        <h1>上方Count组件共享的求和值为：{{countSum}}</h1>
        <h1>角色列表</h1>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="addRole">添加</button>
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
        ...mapState({roles: "roleList",countSum: "sum"}),
    },
    methods: {
        addRole(){
            const newRole = {
                id: nanoid(),
                name: this.name
            }
            this.$store.commit("ADD_ROLE",newRole);
        }
    }
}
</script>

<style scoped>

</style>
<template>
    <div>
        <h1>我是Vue2写的效果</h1>
        <h2 v-show="role.name">姓名：{{role.name}}</h2>
        <h2>年龄：{{role.age}}</h2>
        <h2 v-show="role.sex">性别：{{role.sex}}</h2>
        <h2>爱好：{{role.hobbies}}</h2>
        <button @click="addSex">添加一个sex属性</button>
        <button @click="delName">删除一个name属性</button>
        <button @click="updateHobby">修改第一个爱好</button>
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return {
            role: {
                name: "千珏",
                age: 1500,
                hobbies: ["和狼聊天","唱歌","捉迷藏"]
            }
        }
    },
    methods: {
        addSex(){
            console.log(this.role.sex);
            // this.role.sex = "女";
            this.$set(this.role,"sex","女");
            console.log(this.role.sex);
        },
        delName(){
            console.log(this.role.name);
            this.$delete(this.role,"name");
            console.log(this.role.name);
        },
        updateHobby(){
            console.log(this.role.hobbies);
            // this.role.hobbies[0] = "和人类和狼一起聊天";   // X
            // this.$set(this.role.hobbies,0,"和人类和狼一起聊天")  // √
            this.role.hobbies.splice(0,1,"和人类和狼一起聊天");
            console.log(this.role.hobbies);
        }
    }
}
</script>

<style scoped>
</style>
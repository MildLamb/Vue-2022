<template>
    <div>
        <h2>姓：<input type="text" v-model="role.firstName"></h2>
        <br>
        <h2>名：<input type="text" v-model="role.lastName"></h2>
        <h2>全名：<input type="text" v-model="role.fullName"></h2>
        <h2>年龄：{{role.age}}</h2>
    </div>
</template>

<script>
import {reactive,computed} from "vue";
export default {
    name: "Demo",
    // Vue2 的计算属性
/*    computed: {
        fullName(){
            return this.role.firstName + " - " + this.role.lastName;
        }
    },*/
    setup(){
        let role = reactive({
            firstName: "kind",
            lastName: "red",
            age: 1500
        })

        /**
         * Vue3 的计算属性(简写) -- 没有考虑计算属性被修改的情况(set)
         */
        /*role.fullName = computed(()=>{
            return role.firstName + " - " + role.lastName;
        })*/

        /**
         * Vue3 的计算属性(完整写法) -- 考虑计算属性的读和写
         */
        role.fullName = computed({
            get(){
                return role.firstName + " - " + role.lastName;
            },
            set(value){
                const names = value.split("-");
                for (let i = 0; i < names.length; i++) {
                    names[i] = names[i].trim();
                }
                console.log(names);
                role.firstName = names[0];
                role.lastName  = names[1];
            }
        })

        return {
            role,
        }
    }
}
</script>

<style>

</style>
<template>
    <div>
        <h2>姓名：{{role.name}}</h2>
        <h2>年龄：{{role.age}}</h2>
        <button @click="testHello">测试一下Demo组件的hello自定义事件</button>
    </div>
</template>

<script>
import {reactive} from "vue";
export default {
    name: "Demo",
/*    beforeCreate() {
        console.log("==============beforeCreate===============")
    },*/
    props: ["msg"],
    setup(props,context){
        console.log("============== setup() ===============",this)
        console.log(props);
        console.log(context);
        // console.log(context.attrs);  // 相当于vue2中的$attrs
        // console.log(context.emit);  //  触发自定义事件
        console.log(context.slots);
        let role = reactive({
            name: "kindred",
            age: 1500
        })

        function testHello(){
            context.emit('hello',123)
        }

        return {
            role,
            testHello
        }
    }
}
</script>

<style>

</style>
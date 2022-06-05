<template>
    <div>
        <h2 @click="showInfo">用户名称：{{name}}</h2>
        <h2 @click="test">用户年龄：{{age}}</h2>
        <h2>测试混入：{{y}}</h2>
    </div>
</template>

<script>
import {mixMethods,myData} from "@/mixin.js";  // 导入时是会使用解构赋值的，也就是对应的属性名，找对应位置传过来的值

    export default {
        name: "Master",
        data(){
          return {
              name: "EngulfMissing",
              age: 23,
          }
        },
/*        mounted(){    // 混入的钩子函数优先执行，但其他配置项，vc自己的属性优先
            console.log("mounted被调用!!!!!!!!!!!!!!!!");
        }*/
        mixins: [mixMethods,myData]
    }
</script>

<style scoped>

</style>
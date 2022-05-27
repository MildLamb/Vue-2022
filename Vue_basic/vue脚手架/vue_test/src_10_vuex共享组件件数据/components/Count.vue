<template>
    <div>
        <h1>当前求和为：{{$store.state.sum}}</h1>
        <h1>当前求和放大10倍后：{{$store.getters.bigSum}}</h1>
        <h1>我在{{$store.state.local}},玩{{$store.state.role}}</h1>
        <h1>Role主键共享的列表数据长度为：{{roleList.length}}</h1>
        <select v-model.number="num">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment(num)">+</button>
        <button @click="decrement(num)">-</button>
        <button @click="incrementOdd(num)">当前求和为奇数再加</button>
        <button @click="time_incr(num)">等一等再加</button>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations,mapActions} from "vuex"
export default {
    name: "Count",
    data(){
        return {
            num: 1
        }
    },
    methods: {
        // 本身没有什么业务逻辑，直接就掉方法；store直接去commit调用mutations
/*        increment(){
            this.$store.commit("ADD",this.num);
        },
        decrement(){
            this.$store.commit("DESC",this.num);
        },*/

        // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations,(对象写法)
        ...mapMutations({"increment":"ADD",decrement:"DESC"}),
        // 如果你的mapMutations的方法名和Mutations中的方法名相同，则可以使用数组写法
        // ...mapMutations(["ADD","DESC"]),
        /** *********************************** */
        /*incrementOdd(){
            this.$store.dispatch("addOdd",this.num);
        },
        time_incr(){
            this.$store.dispatch("timeAdd",this.num);
        }*/
        // 借助mapActions生成对应的方法，方法中会调用dispatch去联系Actions中的方法 (对象写法)
        ...mapActions({"incrementOdd":"addOdd",time_incr: "timeAdd"})
        // 如果你的mapActions的方法名和Actions中的方法名相同，则可以使用 数组写法
        // ...mapMutations(["incrementOdd","time_incr"]),


    },
    computed: {
        // 借助mapState生成计算属性，从state中读取数据。(对象写法)
        // ...mapState({"addSum":"sum",local:"local",champion:"champion"})

        // // 借助mapState生成计算属性，从state中读取数据。(数组写法)
        // 如果你的mapState的键名和state中属性的键名字相同
        ...mapState(["sum","local","champion","roleList"]),
        ...mapGetters({"bigSum":"bigSum"})
    }
}
</script>

<style scoped>
button {
    margin: 2px;
}
</style>
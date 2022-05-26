<template>
    <div>
        <h1>当前求和为：{{$store.state.sum}}</h1>
        <select v-model.number="num">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
        <button @click="incrementOdd">当前求和为奇数再加</button>
        <button @click="time_incr">等一等再加</button>
    </div>
</template>

<script>
export default {
    name: "Count",
    data(){
        return {
            num: 1
        }
    },
    methods: {
        // 本身没有什么业务逻辑，直接就掉方法；store直接去commit调用mutations
        increment(){
            this.$store.commit("ADD",this.num);
        },
        decrement(){
            this.$store.commit("DESC",this.num);
        },
        incrementOdd(){
            this.$store.dispatch("addOdd",this.num);
        },
        time_incr(){
            this.$store.dispatch("timeAdd",this.num);
        }
    }
}
</script>

<style scoped>
button {
    margin: 2px;
}
</style>
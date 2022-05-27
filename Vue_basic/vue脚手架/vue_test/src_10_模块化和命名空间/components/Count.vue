<template>
    <div>
        <h1>当前求和为：{{sum}}</h1>
        <h1>当前求和放大10倍后：{{fixSum}}</h1>
        <h1>我在{{local}},玩{{champion}}</h1>
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
        ...mapMutations("countAbout",{"increment":"ADD",decrement:"DESC"}),
        ...mapActions("countAbout",{"incrementOdd":"addOdd",time_incr: "timeAdd"})


    },
    computed: {
        ...mapState("countAbout",["sum","local","champion"]),
        ...mapState("roleAbout",["roleList"]),
        ...mapGetters("countAbout",{"fixSum":"bigSum"})
    },
    mounted() {
        console.log(this.$store);
    }
}
</script>

<style scoped>
button {
    margin: 2px;
}
</style>
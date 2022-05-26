// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

// [vuex] must call Vue.use(Vuex) before creating a store instance.
Vue.use(Vuex);

// 准备 actions --- 用于响应组件中的动作
const actions = {
    /*add: function (context,data){
        console.log("actions中的add被调用了",context,data);
        context.commit("ADD",data);
    },
    desc(context,data){
        context.commit("DESC",data);
    },*/
    addOdd(context,data){
        if(context.state.sum % 2){
            context.commit("ADD",data);
        }
    },
    timeAdd: function (context,data){
        setTimeout(()=>{
            context.commit("ADD",data);
        },1000)
    }
}
// 准备 mutations --- 用于操作数据
const mutations = {
    ADD: function (state,data){
        state.sum += data;
    },
    DESC(state,data){
        state.sum -= data;
    }
}
// 准备 state --- 用于存储数据
const state = {
    sum: 0
}


// 创建Store并暴露
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state
});
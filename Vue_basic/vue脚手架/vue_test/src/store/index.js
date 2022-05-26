// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

// 准备 actions --- 用于响应组件中的动作
const actions = {}
// 准备 mutations --- 用于操作数据
const mutations = {}
// 准备 state --- 用于存储数据
const state = {}

// [vuex] must call Vue.use(Vuex) before creating a store instance.
Vue.use(Vuex);

// 创建Store并暴露
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state
});
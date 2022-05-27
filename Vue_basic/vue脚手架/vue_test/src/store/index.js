// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

// [vuex] must call Vue.use(Vuex) before creating a store instance.
Vue.use(Vuex);


// 求和功能相关的配置
const countOptions = {
    // 开启命名空间
    namespaced: true,
    actions: {
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
    },
    mutations: {
        ADD: function (state,data){
            state.sum += data;
        },
        DESC(state,data){
            state.sum -= data;
        }
    },
    state: {
        sum: 0,
        local: "英雄联盟",
        champion: "千珏"
    },
    getters: {
        bigSum(state){
            return state.sum * 10;
        }
    }
}

// 角色管理相关的配置
const roleOptions = {
    // 开启命名空间
    namespaced: true,
    actions: {},
    mutations: {
        ADD_ROLE(state,roleObj){
            state.roleList.push(roleObj);
        }
    },
    state: {
        roleList: [{id: "001",name: "千珏"},{id: "002",name: "纳尔"},{id: "003",name: "妮蔻"}]
    },
    getters: {}
}


// 创建Store并暴露
export default new Vuex.Store({
    modules: {
        countAbout:countOptions,
        roleAbout:roleOptions
    }
});
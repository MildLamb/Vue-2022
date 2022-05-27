// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

import axios from "axios";

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
    actions: {
        addRoleJue(context,roleObj){
            if (!roleObj.name.indexOf("珏")){
                context.commit("ADD_ROLE",roleObj);
            } else {
                alert("角色名加珏");
            }
        },
        getServeResponse(context){
            axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
                response => {
                    context.commit("GET_RESPONSE",response.data);
                },
                error => {
                    context.commit("GET_RESPONSE",error.message);
                }
            )
        }
    },
    mutations: {
        ADD_ROLE(state,roleObj){
            state.roleList.push(roleObj);
        },
        GET_RESPONSE(state,resp){
            console.log("请求服务器响应");
                state.response = resp;
        }
    },
    state: {
        roleList: [{id: "001",name: "千珏"},{id: "002",name: "纳尔"},{id: "003",name: "妮蔻"}],
        response: ""
    },
    getters: {
        firstRoleName(state){
            return state.roleList[0].name;
        }
    }
}


// 创建Store并暴露
export default new Vuex.Store({
    modules: {
        countAbout:countOptions,
        roleAbout:roleOptions
    }
});
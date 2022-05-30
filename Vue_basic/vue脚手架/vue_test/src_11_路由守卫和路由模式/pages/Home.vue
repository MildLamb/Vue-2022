<template>
    <div>
        <h2>我是Home组件</h2>
        <div>
            <ul class="nav nav-tabs">
                <li>
                    <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
                </li>
                <li>
                    <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
                </li>
            </ul>
            <!-- include保存的是组件的名字，也就是组件中name配置项指定的名字 -->
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    /**
     * 通过路由规则，进入该组件时被调用
     */
    beforeRouteEnter(to,from,next){
        console.log("组件路由守卫",to,from,next);
        if(to.meta.isAuth){
            if (localStorage.getItem("master") === "qsj"){
                next();
            } else {
                alert("权限名不对");
            }
        } else {
            next();
        }
    },
    /**
     * 通过路由规则，离开该组件时被调用
     */
    beforeRouteLeave(to,from,next){
        console.log("App---beforeRouteLeave");
        next();
    },
    beforeRouteUpdate(to,from,next){
        next();
        console.log("组件被更新了，'\"App---beforeRouteUpdate\"'");
    }
}
</script>

<style scoped>

</style>
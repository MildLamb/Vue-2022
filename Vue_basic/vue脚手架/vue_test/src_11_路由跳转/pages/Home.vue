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
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    /*destroyed() {
        console.log("Home组件被销毁了");
    },*/
/*    mounted() {
        console.log("Home组件挂载完毕");
        console.log(this);
    }*/
}
</script>

<style scoped>

</style>
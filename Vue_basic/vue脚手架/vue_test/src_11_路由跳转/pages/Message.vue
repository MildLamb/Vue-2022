<template>
    <div>
        <ul>
            <li v-for="msg in messageList" :key="msg.id">
                <!-- params 传递参数写法 -->
                <!--  跳转路由并携带params参数，to字符串写法-->
                <router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{msg.title}}</router-link> &nbsp;&nbsp;
                <!--  跳转路由并携带params参数，to对象写法,只能使用name，不能使用path-->
                <router-link :to="{name:'xiangqing',params: {rid: msg.id,title: msg.title}}">{{msg.title}}</router-link>



                <!--             query 传递参数写法

                    路由跳转并携带query参数，to字符串写法
                    <router-link :to="`/home/message/detail?id=${msg.id}&title=${msg.title}`">{{msg.title}}</router-link>
                    &lt;!&ndash; 跳转路由并携带query参数，to对象写法 &ndash;&gt;
                    <router-link :to="{name:'xiangqing',query:{id: msg.id,title: msg.title}}">{{msg.title}}</router-link>
                    <router-link :to="{path:'/home/message/detail',query:{id: msg.id,title: msg.title}}">{{msg.title}}</router-link>

                -->
            </li>
        </ul>
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Message",
    data(){
        return {
            messageList: [
                {id: "001",title: "消息1"},
                {id: "002",title: "消息2"},
                {id: "003",title: "消息3"}
            ]
        }
    }
}
</script>

<style scoped>
</style>
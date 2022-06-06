<template>
    <input type="text" v-model="keyWord">
    <h2>{{keyWord}}</h2>
</template>

<script>
import {customRef} from 'vue';
export default {
    name: "App",
    setup(){
        // 自定义一个ref，名为：myRef
        let timer;
        function myRef(data,delay){
            return customRef((track, trigger)=>{
                return {
                    get(){
                        // console.log(`有人从自定义的myRef中获取数据了，我把${data}这个名字给它了`);
                        /**
                         * 通知Vue追踪返回的数据的变化 ，这里就是追踪data的变化
                         */
                        track();
                        return data;
                    },
                    set(newV){
                        console.log(`有人把自定义的myRef中的数据修改了，${newV}是它的新值`);
                        clearTimeout(timer);
                        timer = setTimeout(()=>{
                            data = newV;
                            trigger();   // 通知Vue重新解析模板
                        },delay)
                    }
                }
            })
        }

        let keyWord = myRef("kindred",500);
        return {keyWord};
    }
}
</script>

<style>

</style>

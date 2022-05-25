<template>
    <div class="container">
        <Category title="武器">
            <template v-slot:center>
            <ul>
                <li v-for="(item,index) in weapons" :key="index">{{item}}</li>
            </ul>
            </template>
            <template v-slot:more>
                <div style="display: flex;justify-content: space-around">
                    <a href="#">更多武器</a>
                </div>
            </template>
        </Category>
        <Category title="角色" :listData="roles">
            <template v-slot:center>
                <img src="../public/images/img.png">
            </template>
            <template v-slot:more>
                <div style="display: flex;justify-content: space-around">
                    <a href="#">更多角色</a>
                    <a href="#">更多图片</a>
                </div>
            </template>
        </Category>
        <Category title="生灵" :listData="animal">
            <template v-slot:center>
                <video src="../public/video/penta.mp4" controls></video>
            </template>
            <template v-slot:more>
                <div style="display: flex;justify-content: space-around">
                    <a href="#">更多精彩操作</a>
                </div>
            </template>
        </Category>
    </div>
</template>

<script>

import Category from "@/components/Category";

export default {
    name: "App",
    components: {
        Category
    },
    data(){
        return {
            weapons: ["灵弓","回力镖","魔法种子"],
            roles: ["千珏","纳尔","妮蔻"],
            animal: ["羊","耳廓狐","变色龙"]
        }
    }
}
</script>


<style scoped>
    .container {
        display: flex;
        justify-content: space-around;
    }
    video { width: 100%}
    img{
        width: 100%;
    }
</style>

<template>
    <div class="container">
        <Category title="武器">
            <!--
                v-slot:name="prop"

                v-slot使用具名插槽，使用v-slot:
                v-slot使用作用域插槽，使用v-slot=""
            -->
            <template v-slot="gongju">
                <ul>
                    <li v-for="(item,index) in gongju.wuqi" :key="index">{{item}}</li>
                </ul>
            </template>
        </Category>
        <Category title="武器">
            <template v-slot="gongju">
                <ol>
                    <li v-for="(item,index) in gongju.wuqi" :key="index">{{item}}</li>
                </ol>
            </template>
        </Category>
        <Category title="武器">
            <template v-slot="{wuqi,msg}">
                <h3>{{msg}}</h3>
                <h4 v-for="(item,index) in wuqi" :key="index">{{item}}</h4>
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

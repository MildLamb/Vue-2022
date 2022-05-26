<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <slot :wuqi="weapons" msg="欢迎光临"></slot>
    </div>
</template>

<script>
export default {
    name: "Category",
    props: ["title"],
    data(){
        return {
            weapons: ["灵弓","回力镖","魔法种子"]
        }
    }
}
</script>

<style scoped>
    .category {
        background-color: #46b8da;
        width: 200px;
        height: 350px;
    }
    h3{
        text-align: center;
        background-color: orange;
    }
</style>
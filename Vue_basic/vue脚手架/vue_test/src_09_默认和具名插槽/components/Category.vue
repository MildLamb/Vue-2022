<template>
    <div class="category">
        <h3>{{title}}分类</h3>
        <slot name="center">可以设置默认值，当使用者没有传递具体结构时，展示这句话</slot>
        <slot name="more">可以设置默认值，当使用者没有传递具体结构时，展示这句话2</slot>
    </div>
</template>

<script>
export default {
    name: "Category",
    props: ["title"]
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
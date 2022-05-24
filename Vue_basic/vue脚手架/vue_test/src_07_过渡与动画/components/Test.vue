<template>
    <div>
        <button @click="isShow = !isShow">显式/隐藏</button>
        <transition name="kind" :appear="true">
            <h1 v-show="isShow">你好啊</h1>
        </transition>
    </div>
</template>

<script>
export default {
    name: "Test",
    data(){
        return {
            isShow: true
        }
    }
}
</script>

<style scoped>
    h1 {
        background-color: orange;
    }

    /* 动画 */
    @keyframes comein {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0px);
        }
    }

    .kind-enter-active {
        animation: comein 1s linear;
    }

    .kind-leave-active {
        animation: comein 1s reverse;
    }
</style>
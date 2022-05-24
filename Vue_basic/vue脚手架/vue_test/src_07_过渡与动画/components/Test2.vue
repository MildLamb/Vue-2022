<template>
    <div>
        <button @click="isShow = !isShow">显式/隐藏</button>
        <transition-group name="kind" :appear="true">
            <h1 v-show="isShow" :key="1">你好啊</h1>
            <h1 v-show="isShow" :key="2">小千珏</h1>
        </transition-group>
    </div>
</template>

<script>
export default {
    name: "Test2",
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


    /* 过渡 */
    /**
        进入的起点,离开的终点
     */
    .kind-enter,.kind-leave-to {
        transform: translateX(-100%);
    }
    /**
        进入的终点,离开的起点
     */
    .kind-enter-to,.kind-leave {
        transform: translateX(0);
    }
    /**
        整个进入过程中
     */
    .kind-enter-active,.kind-leave-active {
        transition: 1s linear;
    }

</style>
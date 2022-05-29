<template>
    <ul>
        <li :style="{opacity}">欢迎光临</li>
        <li>news001<input type="text"></li>
        <li>news002<input type="text"></li>
        <li>news003<input type="text"></li>
    </ul>
</template>

<script>
export default {
    name: "News",
/*    destroyed() {
        console.log("News组件被销毁");
    },*/
    data(){
        return {
            opacity: 1
        }
    },
    /*mounted() {
        console.log("mounted",this);
        this.timer = setInterval(()=>{
            this.opacity -= 0.01
            if (this.opacity <= 0) this.opacity = 1
        },16);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }*/
    activated() {
        console.log("News组件被激活");
        console.log("mounted",this);
        this.timer = setInterval(()=>{
            this.opacity -= 0.01
            if (this.opacity <= 0) this.opacity = 1
        },16);
    },
    deactivated() {
        console.log("News组件失活");
        clearInterval(this.timer);
    }
}
</script>

<style scoped>
</style>
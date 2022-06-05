import {onBeforeUnmount, onMounted, reactive} from "vue";

    // 实现获取鼠标位置的方法
export default function(){
    let point = reactive({
        x:0,
        y:0
    })

    // 实现获取鼠标位置的方法
    function getPoint(event){
        // console.log(event.pageX,event.pageY);
        point.x = event.pageX;
        point.y = event.pageY;
    }

    // 实现获取鼠标位置的生命周期钩子
    onMounted(()=>{
        window.addEventListener("click",getPoint)
    });

    onBeforeUnmount(()=>{
        window.removeEventListener("click",getPoint)
    })

    return point;
}
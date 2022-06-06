// 引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

// 创建应用实例对象app(类似于之前vue2中的vm，但app比vm更轻)
const app = createApp(App)
console.log("####",app);
app.mount('#app')

/*setTimeout(()=>{
    app.unmount();
},2000)*/

// 默认的启动
// createApp(App).mount('#app')

// vue2的启动方法
/*new Vue({
    el: "#app",
    components: {
        App
    },
    render: h => h(App)
})*/

# 脚手架笔记

## 安装vue脚手架
- 卸载命令
```text
npm uninstall -g @vue/cli
```
- 安装命令
```text
npm install -g @vue/cli@4.5.13
```
- 查看脚手架历史版本
```text
npm view @vue/cli versions
```

## 脚手架文件结构
```text
|—— node_modules  
|—— public  
|     |—— favicon.ico: 页签图标  
|     |—— index.html: 主页面
|
|—— src
|    |—— assets: 存放静态资源
|    |      |—— logo.png
|    |—— components: 存放组件 
|    |      |—— HelloWorld.vue
|    |—— App.vue: 汇总所有组件   
|    |—— main.js: 入口文件
|—— .gitignore: git版本控制忽略的配置
|—— babel.config.js: babel的配置文件
|—— package.json: 应用包配置文件
|—— README.md: 应用描述文件
|—— package-lock.json: 包版本控制文件
```

## vue.config.js配置文件
- 使用 vue inspect > output.js 可以查看到Vue脚手架的默认配置
- 使用 vue.config.js 可以对脚手架进行个性化定制，详情见: https://cli.vuejs.org/zh

## ref属性
1. 被用来给元素或子组件注册引用信息(id的替代者)
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象(vc)
3. 使用方式:
   - 打标识：
    ```text
   <h1 ref="xxx">...</h1> 或 <Master ref="xxx"></Master>
   ```
   - 获取：this.$refs.xxx

## 配置项props
功能：让组件接收外部传过来的数据
(1). 传递数据：  
```text
<Demo yourPropName="xxx"/>
```

(2). 接收数据：
```vue
props: ["name","age"] // 简单声明接收

// 接收的同时对数据类型进行限制
/*props: {
  name: String,
  age: Number
}*/

// 接收的同时对数据进行类型限制，以及默认值，必要性的限制
/*props: {
  name: {
      type: String,   // name的类型
      required: true  // name是必要的
  },
  age: {
      type: Number,
      default: "?"
  }
}*/
```

## mixin(混入)
- 功能：可以把多个组件共用的配置提取成一个混入对象
- 使用方式：
  1. 定义混入：
```text
const min = {
    data(){
        return {};
    }
},
methods: {
}

export {min};
```
   2. 使用混入
      1. 全局混入：Vue.mixin(xxx)
      2. 局部混入：mixins: []
      
## 插件
- 功能：用于增强Vue
- 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据

# ToDoList案例总结
## 组件化编码流程
1. 实现静态组件： 抽取组件，使用组件实现静态的页面效果
2. 展示动态数据： 考虑号数据的存放位置，数据是一个组件在用，还是一些组件在用
   1. 一个组件在用：放在组件自身即可
   2. 一些组件在用：放在它们共同的父组件上
3. 交互 ---- 从绑定事件监听开始

## props适用于：
(1). 父组件 ==> 子组件 通信
(2). 子组件 ==> 父组件 通信(要求父先给子一个函数)

## 使用v-model时要切记
- v-model绑定的值是不可以是props传过来的值，因为props是不可以修改的
- props传过来的若是对象类型的值，修改对象中的属性Vue不会报错，但不推荐这样使用


# webStorage
1. 存储内容大小一般 支持5MB左右(不同浏览器可能不一样)
2. 浏览器通过 window.sessionStorage 和 window.localStorage 属性来实现本地存储机制
3. 相关API：
    - xxxStorage.setItem("key","value")
    - xxxStorage.getItem("key")
    - xxxStorage.removeItem("key")
    - xxxStorage.clear()
4. 备注：
   - sessionStorage存储的内容会随着浏览器窗口关闭而消失
   - localStorage存储的内容，需要手动清除才会消失
   - getItem("key")如果对应的key的值不存在，返回为null
   - JSON.parse(null) 返回值任然是null

# 组件的自定义事件
1. 一种组件间通信的方式，适用于：子组件 ===> 父组件
2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件(事件的回调在A中)
3. 绑定自定义事件：
   - 一种方式，在父组件中：```<Demo @xxx="testMethod"/>  或者 <Demo v-on:xxx="testMethod"/>```
   - 第二种方式，在父组件中
```html
<Demo ref="id"/>
... ...
mounted(){
    this.$refs.id.$on("xxx",this.testMethod)  或者  this.$refs.id.$on("xxx",()=>{})
}
```
   - 若想让自定义事件只触发一次，可以使用once修饰符，或$once方法
4. 触发自定义事件： this.$emit("xxx",args)
5. 解绑自定义事件： this.$off("xxx")
6. 组件上也可以绑定原生DOM事件，但需要.native修饰
7. 注意：通过this.$refs.id.$on("xxx",回调函数)绑定自定义事件时，回调要么配置在methods中，然后通过this去调用；要么写成 箭头函数
否则this指向的会是，触发该自定义事件的 组件实例对象(vc)

# 全局事件总线
1. 以种组件间通信的方式：适用于任意组件间的通信
2. 安装全局事件总线：
```vue
new Vue({
    ... ...
    beforeCreate(){
        Vue.prototype.$bus = this;  // 安装全局事件总线，$bus就是当前应用的vm
    }
});
```
3. 使用事件总线：
   - 接收数据：A组件想接收数据，则在A组件总给$bus绑定自定义事件，事件的回调留在A组件自身
```
methods(){
   demo(data){.......}
},
... ...
mounted(){
   this.$bus.$on("xxx",this.demo)
}
```
   - 提供数据```this.$bus.$emit("xxx",数据)```

4. 最好在beforeDestroy钩子中，用$off解绑当前组件所用到的事件

# 消息订阅与发布
1. 一种组件间通信的方式，适用于任意组件间的通信
2. 使用步骤：
   1. 安装pubsub： ```npm i pubsub-js```
   2. 引入：```import pubsub from "pubsub-js"```
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身
```text
mounted(){
    pubsub.subscribe("enentName",(eventName,data)=>{});   // 订阅消息
}
```
   4. 提供数据：```pubsub.publish("enentName",data)```
   5. 最好在beforeDestroy钩子中，用pubsub.unsubscribe(pid)取消订阅

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
      
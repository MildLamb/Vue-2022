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

<hr>

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

<hr>

# 组件间通信

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

## nextTick
1. 语法: this.$nextTick(回调函数)
2. 作用：在下一次 DOM 更新结束后执行其指定的回调
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行


<hr>


# vue脚手架配置代理
## 方法一
- 在vue.config.js中添加如下配置：
```text
devServer: {
 proxy: "http://localhost:4567"
}
```
- 说明：
  - 优点：配置简单，请求资源时直接发给前端(8080)即可
  - 缺点：不能配置多个代理，不能灵活的控制请求是否走代理
  - 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器(优先匹配前端已有资源)

## 方法二
- 在vue.config.js中添加如下配置：
```text
devServer: {
    proxy: {
      "/info": {   // 匹配所有以  /info 开头的请求路径
        target: "http://localhost:4567",    // 代理目标的基础路径
        pathRewrite: {"^/info":""},     // 代理服务器给真正的资源服务器请求的时候不需要前缀了
        ws: true,   // websocket支持
        changeOrigin: true   // 用于控制请求头中host值是 源(8080)还是目标服务器(4567)
      },
      "/m_info": {
        target: "http://localhost:8081",
        pathRewrite: {"^/m_info":""}
      }
    }
  }
```

<hr>

# 插槽
1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信方式，适用于父组件 ===> 子组件
2. 分类：默认插槽，具名插槽，作用域插槽
3. 使用方式：
    
- 默认插槽
```text
父组件中：
    <Category>
        <div>html结构</div>
    </Category>
子组件中：
    <template>
        <div>
            <!-- 定义插槽 -->
            <slot>插槽默认内容</slot>
        </div>
    </template>
```
- 具名插槽
```text
父组件中：
    <Category>
        <template v-slot:name1>
            <div>html结构</div>
        </template>
        
        <template v-slot:name2>
            <div>html结构</div>
        </template>
    </Category>
子组件中：
    <template>
        <div>
            <!-- 定义插槽 -->
            <slot name="name1">插槽默认内容</slot>
            <slot name="name2">插槽默认内容</slot>
        </div>
    </template>
```
- 作用域插槽：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定.(weapons数据在Category组件中，但结构由App组件控制)
```text
父组件中：
    <Category>
        <template v-slot="aname">
            <ul>
                <li v-for="(item,index) in aname.prop" :key="index">{{item}}</li>
            </ul>
        </template>
    </Category>
    
子组件中：
    <template>
        <div>
            <slot :aname="my_data"></slot>
        </div>
    </template>
    
    <script>
        export default {
            ... ...
            data() {
                return {
                    my_data: xxx
                }
            }
        }
```

<hr>

# 理解vuex
## vuex是什么
1. 概念：专门在Vue中实现集中式状态(数据)管理的一个Vue插件，对vue应用中多个组件的共享状态进行  
集中式的管理(读/写)，也是一种组件间通信的方式，且适用于任意组件间通信。

## 什么时候使用Vuex?
1. 多个组件依赖于同一状态
2. 来自不同组件的行为需要变更同一状态

# Vuex基本使用
1. 初始化数据，配置actions，配置mutations，配置state，操作文件store.js 或 store/index.js
```text
// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

// [vuex] must call Vue.use(Vuex) before creating a store instance.
Vue.use(Vuex);

// 准备 actions --- 用于响应组件中的动作
const actions = {
        add: function (context,data){
        console.log("actions中的add被调用了",context,data);
        context.commit("ADD",data);
    }
}
// 准备 mutations --- 用于执行操作
const mutations = {
    ADD: function (state,data){
        state.sum += data;
    }
}
// 准备 state --- 用于存储数据
const state = {
    sum: 0
}


// 创建Store并暴露
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state
});
```
2. 组件中读取vuex中的数据：$store.state.xxx
3. 组件中修改vuex中的数据：$store.dispatch("actions中的方法名",数据) 或 $store.commit("mutations中的方法名",数据)
4. 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即可以不写dispatch，直接commit执行mutations中的方法


## Vuex中四个map方法使用
1. mapState方法：用于帮助我们映射state中的数据为计算属性
```text
computed: {
    // 借助mapState生成计算属性，从state中读取数据。(对象写法)
    // ...mapState({"addSum":"sum",local:"local",champion:"role"})

    // // 借助mapState生成计算属性，从state中读取数据。(数组写法)
    // 如果你的mapState的键名和state中属性的键名字相同
    ...mapState(["sum","local","role"]),
}
```

2. mapGetters方法：用于帮助我们映射getters中的数据为计算属性
```text
computed: {
    // 借助mapGetters生成计算属性，从getters中读取数据。(对象写法)
    // ...mapGetters({"addSum":"sum",local:"local",champion:"role"})

    // // 借助mapGetters生成计算属性，从getters中读取数据。(数组写法)
    // 如果你的mapGetters的键名和getters中属性的键名字相同
    ...mapGetters(["sum","local","role"]),
}
```
3. mapActions方法：用于帮助我们生成与actions对话的方法，即：包含$store.dispatch(xxx,data)的函数
```text
methods: {
    // 借助mapMutations生成对应的方法，方法中会调用commit去联系mutations,(对象写法)
    ...mapMutations({"increment":"ADD",decrement:"DESC"}),
    // 如果你的mapMutations的方法名和Mutations中的方法名相同，则可以使用数组写法
    // ...mapMutations(["ADD","DESC"]),
}
```
4. mapMutations方法：用于帮助我们生成与mutations对话的方法：即：包含$store.commit(xxx,data)的函数
```text
methods: {
    // 借助mapActions生成对应的方法，方法中会调用dispatch去联系Actions中的方法 (对象写法)
    ...mapActions({"incrementOdd":"addOdd",time_incr: "timeAdd"})
    // 如果你的mapActions的方法名和Actions中的方法名相同，则可以使用 数组写法
    // ...mapMutations(["incrementOdd","time_incr"]),
}
```

<hr>


# 模块化 + 命名空间
1. 目的： 让代码更好维护，让多种数据分类更加明确
2. 修改 store.js
```javascript
// 该文件用于创建Vuex中最为核心的store

// 引入Vuex
import Vuex from "vuex";
// 引入Vue
import Vue from "vue";

import axios from "axios";

// [vuex] must call Vue.use(Vuex) before creating a store instance.
Vue.use(Vuex);


// 求和功能相关的配置
const countOptions = {
    // 开启命名空间
    namespaced: true,
    actions: {

    },
    mutations: {

    },
    state: {

    },
    getters: {

    }
}

// 角色管理相关的配置
const roleOptions = {
    // 开启命名空间
    namespaced: true,
    actions: {

    },
    mutations: {

    },
    state: {

    },
    getters: {

    }
}


// 创建Store并暴露
export default new Vuex.Store({
    modules: {
        countAbout:countOptions,
        roleAbout:roleOptions
    }
});
```
3. 开启命名空间后，组件中读取state数据
```text
// 方式一：自己直接读取
this.$store.state.namespacedName.props;
// 方式二：借助了mapState读取
...mapState("namespacedName",["props"]);
```
4. 开启命名空间后，组件中读取getters数据
```text
// 方式一：自己直接读取
this.$store.getters["namespacedName/gettersName"];
// 方式二：借助了mapGetters读取
...mapGetters("namespacedName",["gettersName"]);
```
5. 开启命名空间后，组件调用dispatch
```text
// 方式一：自己直接dispatch
yourMethod(){
    this.$store.dispatch("namespacedName/ActionName",data);
}
// 方式二：借助mapActions
...mapActions("namespacedName",{yourMethod: "ActionName",yourMethod2: "ActionName2"});
```
6. 开启命名空间后，组件中调用commit
```text
// 方式一：自己直接commit
yourMethod(){
    this.$store.commit("namespacedName/MutationName",data);
}
// 方式二：借助mapActions
...mapMutations("namespacedName",{yourMethod: "MutationName",yourMethod2: "MutationName2"})
```

<hr>

# vue-router
## vue-router的理解
vue的一个插件库，专门用来实现SPA应用

## SPA的理解
1. 单页面web应用(single page web application,SPA)
2. 整个应用只有一个完整的页面
3. 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
4. 数据需要通过ajax请求获取

## vue-router基本使用
1. 安装vue-router插件, npm i vue-router@3   , 注意vue2只能用router3
2. 使用插件 Vue.use(VueRouter)
3. 编写router实例对象，管理路由规则
```text
// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from "@/components/About";
import Home from "@/components/Home";


// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            path: "/about",
            component: About
        },
        {
            path: "/home",
            component: Home
        }
    ]
})
```
4. main.js使用自己的路由规则
```text
import Vue from "vue";
import App from "./App";
// 引入vue-router插件
import VueRouter from "vue-router";
// 引入路由器
import MyRouter from "./router/index";

Vue.config.productionTip = false;
// 使用 vue-router 插件
Vue.use(VueRouter);

new Vue({
    el: "#container",
    components: {
        App
    },
    render: h => h(App),
    // 把我的路由器交给路由配置项
    router: MyRouter
});
```
5. 实现样式切换
```text
<router-link active-class="active" to="/about">About</router-link>
```
6. 指定组件展示位置
```text
<router-view></router-view>
```

## 几个注意点
1. 路由组件通常存放在 pages 文件夹，一般组件通常存放在 components 文件夹
2. 通过切换，"隐藏"了的路由组件，默认是被销毁掉的，需要的时候再去挂载
3. 每个组件都有自己的 $route 属性，里面存储着自己的路由信息
4. 整个应用只有一个router，可以通过组件的$router属性获取到

## 多级路由(嵌套路由)
1. 配置路由规则，使用children配置项
```text
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "news",
                    component: News
                }
            ]
        }
    ]
})
```
2. 跳转(写完整的后缀)
```text
<router-link to="/home/news">News</router-link>
```

## 命名路由
1. 作用：一些时候可以简化路由的跳转
2. 如何使用：
- 给路由命名
```text
routes: [
        {
            name: "guanyu",
            path: "/about",
            component: About
        },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "news",
                    component: News
                },
                {
                    path: "message",
                    component: Message,
                    children: [
                        {
                            name: "xiangqing",
                            path: "detail",
                            component: Detail
                        }
                    ]
                }
            ]
        }
    ]
```
- 简化跳转：
```text
<!-- 简化前 -->
<router-link class="list-group-item" active-class="active" to="/about">About</router-link>
<!-------------------------------------->
<router-link :to="{path:'/home/message/detail',query:{id:msg.id,title:msg.title}}">{{msg.title}}</router-link>

<!-- 简化后，通过name指定名字直接跳转 -->
<router-link class="list-group-item" active-class="active" :to="{name: 'guanyu'}">About</router-link>
<!-------------------------------------->
<router-link :to="{name:'xiangqing',query:{id:msg.id,title:msg.title}}">{{msg.title}}</router-link>
```

# 路由传参
## query传参

- 路由接收
```text
// 三级路由 detail 的配置
children: [
    {
        name: "xiangqing",
        path: "detail",
        component: Detail
    }
]
```

- 跳转
```text
// query 参数写法

// 路由跳转并携带query参数，to字符串写法
<router-link :to="`/home/message/detail?id=${msg.id}&title=${msg.title}`">{{msg.title}}</router-link>
// 跳转路由并携带query参数，to对象写法
<router-link :to="{name:'xiangqing',query:{id: msg.id,title: msg.title}}">{{msg.title}}</router-link>
<router-link :to="{path:'/home/message/detail',query:{id: msg.id,title: msg.title}}">{{msg.title}}</router-link>
```

- 使用
```text
// Detail组件中 使用$route.query.xxx 获取参数值
<ul>
    <li>消息编号：{{$route.query.id}}</li>
    <li>消息内容：{{$route.query.title}}</li>
</ul>
```

## params 传参，params只能用命名路由传递
- 路由接收 
```text
... ...
children: [
    {
        name: "xiangqing",
        path: "detail/:rid/:title",
        component: Detail
    }
]
```
- 跳转
```text
<!--  跳转路由并携带params参数，to字符串写法-->
<router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{msg.title}}</router-link> &nbsp;&nbsp;
<!--  跳转路由并携带params参数，to对象写法,只能使用name，不能使用path-->
<router-link :to="{name:'xiangqing',params: {rid: msg.id,title: msg.title}}">{{msg.title}}</router-link>
```
- 使用
```text
// Detail组件中使用 params 传递过来的参数
<ul>
    <li>消息编号：{{$route.params.rid}}</li>
    <li>消息内容：{{$route.params.title}}</li>
</ul>
```

## 路由的props属性
```text
children: [
    {
        name: "xiangqing",
        path: "detail/:rid/:title",
        component: Detail,
        // props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传递给当前配置props配置项所在的组件,传递的是死数据，用的少
        /*props: {
            name: "kindred",
            age: 1500
        }*/

        // props第二种写法, 值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传递给当前配置props配置项所在的组件
        // props: true

        /* props第三种写法，值为函数，函数的返回值配置为对象，对象中匹配属性的值
            这种方式就可以匹配 query 属性
         */

        /*props($route){
            return {
                rid: $route.params.rid,
                title: $route.params.title
            }
        }*/

        // 使用解构赋值简化第三种写法 ,假如想要query中的参数  {query},  意思是从 $route 中提取 query属性作为参数
        props({params}){
            return {
                rid: params.rid,
                title: params.title
            }
        }
    }
]
```

### router-link 的 replace 属性
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入模式：分别为push和replace，push是追加历史记录，replace是替换当前(栈顶)记录，路由跳转时候
默认为push
3. 如何开启replace模式，<router-link :replace="true">News</router-link>

## 编程式路由导航
1. 作用：不借助<router-link> 实现路由跳转，让路由跳转更加灵活
2. 具体编码：
```text
// push 模式
this.$router.push({
    name: "xiangqing",
    params: {
        rid: msg.id,
        title: msg.title
    }
})


// replace 模式
this.$router.replace({
    name: "xiangqing",
    params: {
        rid: msg.id,
        title: msg.title
    }
})


// 历史记录后退
this.$router.back();

// 历史记录前进
this.$router.forward();

// 自己控制前进还是后退，以及多少步
// 正数表示前进几次
// 负数表示后退几步
this.$router.go(-2);
```

## 缓存路由组件
1. 作用：让不展示的路由组件保持挂载，不被销毁
2. 具体编码
```text
<keep-alive include="['News','Message']">
    <router-view></router-view>
</keep-alive>
```

## 两个新的生命周期钩子
1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
2. 具体名字：
   1. activated 路由组件被激活时触发
   2. deactivated 路由组件失活时触发


# 路由守卫
1. 作用：对路由进行权限控制
2. 分类：全局路由守卫，独享守卫，组件内守卫
- 全局守卫：
在路由中配置,对router实例对象配置
```text
/**
 * 添加路由守卫
 * - 全局前置路由守卫
 */
router.beforeEach((to,from,next)=>{
    console.log("前置路由守卫",to,from,next);
    if(to.meta.isAuth){
        if (localStorage.getItem("master") === "qsj"){
            next();
        } else {
            alert("权限名不对");
        }
    } else {
        next();
    }

})

/**
 * 后置路由守卫：初始化的时候被调用，每次路由切换之后被调用
 */
router.afterEach((to,from,next)=>{
    document.title = to.meta.title || "Vue学习首页";
    console.log("后置路由守卫",to,from,next);
})
```
- 独享路由守卫(只有前置守卫)
单独作为某个路由的一个配置项
```text
beforeEnter: (to, from, next) => {
    console.log("前置路由守卫",to,from,next);
    if(to.meta.isAuth){
        if (localStorage.getItem("master") === "qsj"){
            next();
        } else {
            alert("权限名不对");
        }
    } else {
        next();
    }
}
```
- 组件路由守卫
写在组件中，类似于生命周期钩子
```text
/**
     * 通过路由规则，进入该组件时被调用
     */
    beforeRouteEnter(to,from,next){
        console.log("组件路由守卫",to,from,next);
        if(to.meta.isAuth){
            if (localStorage.getItem("master") === "qsj"){
                next();
            } else {
                alert("权限名不对");
            }
        } else {
            next();
        }
    },
    /**
     * 通过路由规则，离开该组件时被调用
     */
    beforeRouteLeave(to,from,next){
        console.log("App---beforeRouteLeave");
        next();
    },
    
    
    beforeRouteUpdate(to,from,next){
        next();
        console.log("组件被更新了，'\"App---beforeRouteUpdate\"'");
    }
```

## 路由器的两种工作模式
1. 对于一个url来说，什么是hash值? ---- #及其后面的内容就是hash值
2. hash值不会包含在HTTP请求中，即：hash值不会带给服务器
3. hash模式：
   1. 地址中永远带着#号，不美观
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
   3. 兼容性较好
4. history模式：
   1. 地址干净，美观
   2. 兼容性和hash模式相比略差
   3. 应用部署上线时需要后端人员的支持，解决刷新页面服务端404的问题
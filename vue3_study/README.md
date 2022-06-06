# vue3_study
## setup函数
1. 理解：Vue3中一个新的配置项，值为一个函数
2. setup是所有Composition API (组合API) "表演的舞台"
3. 组件中所用到的：数据，方法等等，均要配置在setup中
4. setup函数的两种返回值
   1. 若返回一个对象，则对象中的属性，方法，在模板中均可以直接使用. (重点关注)
   2. 若返回一个渲染函数，则可以自定义渲染内容. (了解)
5. 注意点：
   1. 尽量不要与Vue2配置混用
      1. Vue2配置(data,methods,computed...)中可以访问到setup中的属性，方法
      2. 但在setup中不能访问到Vue2配置(data,methods,computed)
      3. 如果有重名，存在覆盖
   2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性.(后期也可以返回一个Promise实例，但需要Suspense和异步组件引入的支持)

## ref函数
1. 作用：定义一个响应式的数据
2. 语法：const xxx = ref(initValue);
   - 创建一个包含响应式数据的引用对象(reference对象)
   - JS 中操作数据：xxx.value
   - 模板中读取数据：不需要.value,直接通过xxx读取 , <div>{{xxx}}</div>
3. 备注：
   - 接收的数据可以是：基本类型，也可以是对象类型
   - 基本数据类型的数据：响应式依然是靠 Object.defineProperty() 的 get 与 set 完成
   - 对象类型的数据：内部借助了 Vue3 中的一个新函数 ------- reactive 函数

## active函数
- 作用：定义一个 对象类型 的响应式数据(基本类型不要用它，要用ref函数)
- 语法：const 代理对象名称 = reactive(源对象) 接收一个对象(或数组),返回一个代理对象 (proxy对象)
- reactive定义的响应式数据是"深层次的"
- 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作

# Vue3中的响应式原理
## Vue2中的响应式
- 实现原理：
  - 对象类型：通过Object.defineProperty()对属性的读取，修改进行拦截(数据劫持)
  - 数组类型：通过重写更新数组的一系列方法来实现拦截。(对数组的变更方法进行了二次封装)
```text
Object.defineProperty(data,"prop",{
    get(){},
    set(){}
})
```
- 存在问题：
  - 新增属性。删除属性，界面不会更新
  - 直接通过下标修改数据，界面不会自动更新

## Vue3的响应式
- 实现原理：
  - 通过Proxy(代理)：拦截对象中任意属性的变化，包括：属性值的读写，属性的添加，删除等
  - 通过Reflect(反射)：对被代理对象的属性进行操作
```text
    const r = new window.Proxy(role,{
        // 有人读取r的属性时调用
        get(target, propName) {
            console.log(target);
            console.log("有人读取了r身上的" + propName + "属性");
            /**
             * target 是源数据 这里只有name和age
             * target里面没有propname  所以是undefined
             * 所以要用[propname]的形式  这样的话  propname就会被成变量来解析
             */
            // return target[propName];
            return Reflect.get(target,propName);
        },
        // 有人增加或修改r的属性时调用
        set(target, propName, value) {
            console.log(`有人修改了r身上的${propName}属性，新值为:${value}`);
            console.log("target[propName]" , target[propName]);
            // target[propName] = value;
            Reflect.set(target,propName,value);
        },
        // 有人删除r的属性时调用
        deleteProperty(target, propName) {
            console.log(`有人要删除r上的属性${propName}`);
            // return delete target[propName];
            Reflect.deleteProperty(target,propName);
        }
    });
```

## reactive对比ref
- 从定义数据角度对比：
  - ref用来定义：基本数据类型数据
  - reactive用来定义：对象(或数组)类型数据
  - 备注：ref也可以用来定义对象(或数组)类型数据，它内部会自动通过reactive转为代理对象
- 从原理角度对比：
  - ref通过Object.defineProperty()的get和set来实现响应式(数据劫持)
  - reactive通过使用Proxy来实现响应式(数据劫持)，并通过Reflect操作源对象内部的数据
- 从使用角度对比：
  - ref定义的数据：操作数据需要.value，读取数据时页面模板中直接读取不需要.value
  - reactive定义的数据：操作数据和读取数据：都不需要.value

## setup的两个注意点
- setup执行的时机
  - 在beforeCreate之前执行一次，this是undefined
- setup的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性
  - context：上下文对象
    - attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声明接收的属性，相当于this.$attrs
    - slots：收到的插槽内容，相当于this.$slots
    - emit：分发自定义事件的函数，相当于this.$emit


## Vue3 watch函数
- 两个小坑：
  - 监视reactive定义的响应式数据时：oldValue无法正确获取，强制开启了深度监视(deep配置失效)
  - 监视reactive定义的响应式数据中某个属性时(是对象)，deep配置有效
```text
        // 情况一：监视ref所定义的一个响应式数据
        /*watch(sum,(newV,oldV)=>{
            console.log("sum的值变化了，新值为：" + newV + ",旧值为：" + oldV);
        },{immediate: true,deep: true})*/

        // 情况二：监视ref所定义的多个响应式数据
        /*watch([sum,msg],(newV,oldV)=>{
            console.log("sum的值变化了" ,newV ,oldV);
        })*/

        // 情况三：监视reactive定义的一个响应式数据的全部属性
        /**
         * 注意：
         *  1. 此处无法正确的获取oldV的值，原因可能是对象监视的是地址值
         *  2. 强制开启了深度监视  {deep: true} 无效
         */
/*        watch(role,(newV,oldV)=>{
            console.log("role变化了",newV,oldV);
        })*/

        // 情况四：监视reactive所定义的一个响应式数据中的某一个属性
        /*watch(()=>role.age,(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        })*/


        // 情况五：监视reactive所定义的一个响应式数据中的某些属性
/*        watch([()=>role.age,()=>role.name],(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        })*/

        // 特殊情况：监视reactive所定义的一个响应式数据中的某个深度对象中的属性
        watch(()=>role.job,(newV,oldV)=>{
            console.log("role的年龄变化了",newV,oldV);
        },{deep:true})
```

## watchEffect函数
- watch的套路是：既要指明监视的属性，也要指明监视的回调
- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到了哪些属性，那就监视哪些属性
- watchEffect有点像computed：
  - 但computed注重计算出来的值(回调函数的返回值)，所以必须要写返回值
  - 而watchEffect更注重的是过程(回调函数的函数体)，所以不用写返回值
```text
watchEffect(()=>{
    const x = sum.value;
    const x2 = role.job.type1.name;
    console.log("watchEffect所指定的回调调用了");
})
```

## Vue3生命周期
<svg width="838" height="1388" xmlns="http://www.w3.org/2000/svg" fill="none" font-family="Inter,Roboto,sans-serif" font-size="14" text-anchor="middle">
  <g transform="translate(283 63)">
    <path d="M131 66v35h6l-7 14-7-14h6v-35h2z" fill="#9AA9B2"/>
    <rect stroke="#2F679A" fill="#3E6B94" x="0.5" y="0.5" width="259" height="66" rx="8"/>
    <text x="130" y="24.5" fill="#FFF" dominant-baseline="middle">
      app = Vue.<tspan fill="#FFB196" dominant-baseline="middle">createApp</tspan>(<tspan fill="#39DD95" dominant-baseline="middle">options</tspan>)
    </text>
    <text x="130" y="43" fill="#FFF" dominant-baseline="middle">
      app.<tspan fill="#FFB196" dominant-baseline="middle">mount</tspan>(<tspan fill="#39DD95" dominant-baseline="middle">el</tspan>)
    </text>
  </g>
  <g transform="translate(316 178)">
    <path d="M98 58v46h6l-7 14-7-14h6v-46h2z" fill="#9AA9B2"/>
    <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="193" height="58" rx="8"/>
    <text x="97" y="20.5" fill="#FFF" dominant-baseline="middle">Init</text>
    <text x="97" y="39" fill="#FFF" dominant-baseline="middle">events &amp; lifecycle</text>
  </g>
  <g transform="translate(73 235)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">beforeCreate</text>
  </g>
  <g transform="translate(316 296)">
    <path d="M98 58v46h6l-7 14-7-14h6v-46h2z" fill="#9AA9B2"/>
    <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="193" height="58" rx="8"/>
    <text x="97" y="20.5" fill="#FFF" dominant-baseline="middle">Init</text>
    <text x="97" y="39" fill="#FFF" dominant-baseline="middle">injections &amp; reactivity</text>
  </g>
  <g transform="translate(73 353)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">created</text>
  </g>
  <g transform="translate(317 414)">
    <path d="M-45 53v52h6l-7 14-7-14h6v-54h286v54h6l-7 14-7-14h6v-52z" fill="#9AA9B2"/>
    <polygon points="96,0.5 192,52 96,103.5 0,52" stroke="#F2781E" fill="#FF8228"/>
    <text fill="#FFF" x="96" y="33.5" dominant-baseline="middle">Has</text>
    <text fill="#FFF" x="96" y="52" dominant-baseline="middle">“template”</text>
    <text fill="#FFF" x="96" y="70.5" dominant-baseline="middle">option?</text>
    <text fill="#8E9EA9" x="-58.5" y="66.5" text-anchor="end" dominant-baseline="middle">YES</text>
    <text fill="#8E9EA9" x="250" y="66.5" text-anchor="start" dominant-baseline="middle">NO</text>
  </g>
  <g transform="translate(167 533)">
    <path d="M103 58h2v44h282v-44h2v46h-142v54h6l-7 14l-7-14h6v-54h-142z" fill="#9AA9B2"/>
    <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="207" height="58" rx="8"/>
    <text fill="#FFF" x="104" y="20.5" dominant-baseline="middle">Compile template</text>
    <text fill="#FFF" x="104" y="39" dominant-baseline="middle">into render function <tspan fill="#F6DA72" dominant-baseline="middle">*</tspan></text>
    <g transform="translate(284 0)">
      <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="207" height="58" rx="8"/>
      <text fill="#FFF" x="104" y="20.5" dominant-baseline="middle">Compile el’s innerHTML</text>
      <text fill="#FFF" x="104" y="39" dominant-baseline="middle">as template <tspan fill="#F6DA72" dominant-baseline="middle">*</tspan></text>
    </g>
  </g>
  <g transform="translate(73 639)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">beforeMount</text>
  </g>
  <g transform="translate(316 705)">
    <path d="M98 58v77h6l-7 14-7-14h6v-77h2z" fill="#9AA9B2"/>
    <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="193" height="58" rx="8"/>
    <text x="97" y="20.5" fill="#FFF" dominant-baseline="middle">Create app.$el and</text>
    <text x="97" y="39" fill="#FFF" dominant-baseline="middle">append it to el</text>
  </g>
  <g transform="translate(73 777)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">mounted</text>
  </g>
  <g>
    <g transform="translate(651.5 802.363) rotate(140 0 0)">
      <path d="M14 0v14l-14-7l14-7z" fill="#DB5B62"/>
      <line x1="60" y1="7" x2="15" y2="7" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    </g>
    <g transform="translate(619 747)">
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
      <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">beforeUpdate</text>
    </g>
    <g transform="translate(642.5 1008.363) rotate(220 0 0)">
      <path d="M14 0v14l-14-7l14-7z" fill="#DB5B62"/>
      <line x1="60" y1="7" x2="15" y2="7" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    </g>
    <g transform="translate(619 1003)">
      <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
      <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">updated</text>
    </g>
    <path transform="translate(430 803)" stroke="#8999A4" stroke-width="2" stroke-dasharray="4" stroke-dashoffset="6" d="M147 16a95 95,0,1,1,-102 0"/>
    <g transform="translate(539 860)">
      <rect stroke="#23AC70" fill="#3AB881" x="0.5" y="0.5" width="141" height="77" rx="8"/>
      <text x="71" y="20.5" fill="#FFF" dominant-baseline="middle">Virtual DOM</text>
      <text x="71" y="39" fill="#FFF" dominant-baseline="middle">re-rendered</text>
      <text x="71" y="57.5" fill="#FFF" dominant-baseline="middle">and patch</text>
    </g>
    <g transform="translate(526 803)">
      <text x="0" y="0" fill="#8E9EA9" dominant-baseline="middle">when data</text>
      <text x="0" y="18.5" fill="#8E9EA9" dominant-baseline="middle">changes</text>
    </g>
  </g>
  <g transform="translate(366 854)">
    <circle stroke="#DC424C" fill="#DB5860" cx="47" cy="47" r="46.5"/>
    <text x="47" y="48" fill="#FFF" dominant-baseline="middle">Mounted</text>
    <path stroke="#9AA9B2" stroke-width="2" stroke-dasharray="3" d="M47 96v33"/>
  </g>
  <g transform="translate(355 947)">
    <text x="58" y="55" fill="#8E9EA9" dominant-baseline="middle">when</text>
    <text x="58" y="73.5" fill="#8E9EA9" dominant-baseline="middle">app.<tspan fill="#DB5B62" dominant-baseline="middle">unmount</tspan>()</text>
    <text x="56" y="92" fill="#8E9EA9" dominant-baseline="middle">is called</text>
    <path stroke="#9AA9B2" stroke-width="2" stroke-dasharray="3" d="M58 107v51"/>
    <path d="M51 159l7 14 7-14z" fill="#9AA9B2"/>
  </g>
  <g transform="translate(73 1056)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">beforeUnmount</text>
  </g>
  <g transform="translate(73 1150)">
    <path d="M160 18v14l-14-7l14-7z" fill="#DB5B62"/>
    <line x1="338" y1="25" x2="161" y2="25" stroke="#DB5B62" stroke-width="2" stroke-dasharray="3"/>
    <rect stroke="#DB5B62" stroke-width="2" x="1" y="1" width="144" height="48" rx="8"/>
    <text x="73" y="25.5" fill="#DB5B62" dominant-baseline="middle">unmounted</text>
  </g>
  <g transform="translate(359 1120)">
    <circle stroke="#DC424C" fill="#DB5860" cx="54" cy="54" r="53.5"/>
    <text x="54" y="55" fill="#FFF" dominant-baseline="middle">Unmounted</text>
  </g>
  <g transform="translate(413 1299.5)">
    <text x="0" y="0" fill="#848484" dominant-baseline="middle">* Template compilation is performed ahead-of-time if using</text>
    <text x="0" y="18.5" fill="#848484" dominant-baseline="middle">a build step, e.g., with single-file components.</text>
  </g>
</svg>


## Vue3生命周期的一些变动
- Vue3中可以继续使用Vue2中的生命周期钩子，但有两个被更名：
  - beforeDestroy 更名为 beforeUmount
  - destroyed 更名为 unmounted
- Vue3也提供了Cpmposition API形式的生命周期钩子，即可以在setup中使用生命周期函数，但有些许变化
  - beforeCreate ===> setup()
  - created ========> setup()
  - beforeMount ====> onBeforeMount()
  - mounted ========> onMounted()
  - beforeUpdate ===> onBeforeUpdate()
  - updated ========> onUpdated()
  - beforeUnmount ==> onBeforeUnmount()
  - unmounted ======> onUnmounted()

## 自定义hook函数
- 什么是hook? ———— 本质是一个函数，把setup函数中使用的Composition API进行了封装
- 类似于vue2中的mixin
- 自定义hook的优势，复用代码，让setup中的逻辑更清除易懂

## toRef
- 作用：创建一个ref对象，其value值指向另一个对象中的某个属性
- 语法：const name = toRef(role,"name")
- 应用：要将响应式对象中的某个属性单独提供给外部使用时
- 扩展：toRefs与toRef功能一致，但可以批量创建多个ref对象，语法：toRefs(role)

## 其他Composition API
### shallowReactive与shallowRef
- shallowReactive：只处理对象最外层属性的响应式(浅响应式)
- shallowRef：只处理基本数据类型的响应式，不进行对象类型的响应式处理
- 什么时候用?
  - 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 ==> shallowReactive
  - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生成新对象进行替换

### readonly与shallowReadonly (和下面的markRaw对不，用readonly，连修改的资格都没有)
- readonly：让一个响应式数据变为只读的(深只读)(数据压根就不能改)
- shallowReadonly：让一个响应式数据变为只读的(浅只读，只考虑对象的第一层属性)
- 应用场景：不希望数据被修改时

### toRaw 与 markRaw (和上面的对比，markRaw只是让数据失去响应式，数据还是变化了)
- toRaw:
  - 作用：将一个由reactive生成的响应式对象转为普通对象
  - 应用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面的更新
- markRaw:
  - 作用：标记一个对象，使其永远不会再成为响应式对象
  - 应用场景：
    1. 有些值不应该设置为响应式的，例如复杂的第三方库等
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能

### customRef 自定义 ref
- 作用：创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制
```text
<template>
    <input type="text" v-model="keyWord">
    <h2>{{keyWord}}</h2>
</template>

<script>
import {customRef} from 'vue';
export default {
    name: "App",
    setup(){
        // 自定义一个ref，名为：myRef
        let timer;
        function myRef(data,delay){
            return customRef((track, trigger)=>{
                return {
                    get(){
                        // console.log(`有人从自定义的myRef中获取数据了，我把${data}这个名字给它了`);
                        /**
                         * 通知Vue追踪返回的数据的变化 ，这里就是追踪data的变化
                         */
                        track();
                        return data;
                    },
                    set(newV){
                        console.log(`有人把自定义的myRef中的数据修改了，${newV}是它的新值`);
                        clearTimeout(timer);
                        timer = setTimeout(()=>{
                            data = newV;
                            trigger();   // 通知Vue重新解析模板
                        },delay)
                    }
                }
            })
        }

        let keyWord = myRef("kindred",500);
        return {keyWord};
    }
}
</script>

<style>

</style>
```

### 祖孙组件通信 provide 和 inject
- 作用：实现祖孙组件间通信
- 套路：祖组件有一个provide选项来提供数据，后代组件有一个inject选项来注入数据
- 具体写法：
  - 祖组件中
```text
setup(){
        let role = reactive({
            name: "kindred",
            age: 1500
        });

        /**
         * param1 给提供的数据起一个名字
         * param2 需要提供的数据
         */
        provide("my_role",role);

        return {
            ...toRefs(role)
        };
    }
```
  - 孙组件中
```text
setup(){
        let role_age = inject("my_role");

        return {
            role_age
        }
    }
```

### 响应式数据的判断
- isRef:检查一个值是否为一个ref对象
- isReactive：检查一个对象是否由reactive创建的响应式代理
- isReadonly：检查一个对象是否由readonly创建的只读
- isProxy：检查一个对象是否由reactive或者readonly方法创建代理

## Composition API的优势
1. Options API存在的问题
- 使用传统OptionsAPI，新增或者修改一个需求，就需要分别在data，methods，computed里修改

2. Composition API的优势
- 我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

## 新的组件
### Fragment
- 在Vue2中：组件必须有一个根标签
- 在Vue3中：组件可以没有根标签，内部会将多个标签包含在一个Fragment虚拟元素中
- 好处：减少标签层级，减少内存占用

### Teleport
- 什么是Teleport? ———— Teleport是一种能够将我们的组件html结构移动到指定位置的技术
```text
<!-- 传送走某一块 to的目标还可以是 css选择器 -->
        <teleport to="body">
            <div v-if="isShow" class="mask">
                <div class="dialog">
                    <h3>我是一个弹窗</h3>
                    <button @click="isShow = false">关闭弹窗</button>
                </div>
            </div>
        </teleport>
```

### Suspense
- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验
- 使用步骤
  - 异步引入组件
```text
// 引入异步组件
import {defineAsyncComponent} from "vue";
const Son = defineAsyncComponent(()=>import("@/components/Son"))  // 动态，异步引入
```
  - 使用Suspense包裹组件，并配置好default和fallback插槽
```text
<Suspense>
    <template v-slot:default>
        <Son></Son>
    </template>
    <template v-slot:fallback>
        <h3>Loading...</h3>
    </template>
</Suspense>
```
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
   2. setup不能是一个async函数，因为返回值不再是return的对象，而是promise，模板看不到return对象中的属性

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
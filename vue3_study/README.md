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

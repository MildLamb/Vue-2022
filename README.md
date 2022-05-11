# Vue-2022
行动战胜迷茫

# Vue特点
1. 采用组件化模式，提高代码复用率、且让代码更好维护。
2. 声明式编码，让编码人员无需直接操作DOM，提高开发效率。
3. 使用虚拟DOM+优秀的Diff 算法，尽量复用DOM节点。

# 关于使用v-命令时，IDEA提示错误的解决方法
- 开头添加如下
```html
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml">
```

# 数据代理图示

# Vue中的事件修饰符
1. prevent: 阻止默认事件(常用)
2. stop：阻止事件冒泡(常用)
3. once：事件只触发一次(常用)
4. self：只有event.target是当前操作的元素时才触发事件
5. capture：使用事件的捕获模式
6. passive：事件的默认行为立即执行，无需等待事件回调执行完毕

# 两个重要的原则
1. 所被Vue管理的函数，最好写成普通函数，这样this的指向才是 vm 或 组件实例对象
2. 所有不被Vue所管理的函数(定时器的回调函数，ajax的回调函数等)，最好写成箭头函数，这样this
的指向才是 vm 或 组件实例对象
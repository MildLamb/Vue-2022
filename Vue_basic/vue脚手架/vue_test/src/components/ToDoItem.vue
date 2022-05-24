<template>
    <transition name="todo_li" appear>
    <li>
        <label>
            <input type="checkbox" :checked="(todo.isFinish === true ? true : false)" @click="handleCheck(todo.id)"/>
            <!-- 使用v-model也可以实现，但不建议，因为vue不建议修改props传递过来的值 -->
<!--            <input type="checkbox" v-model="todo.isFinish"/>-->
            <span v-show="!todo.isEdit">{{todo.wantDo}}</span>
            <input v-show="todo.isEdit" type="text" :value="todo.wantDo" @blur="handleBlur(todo,$event)" ref="input">
        </label>
        <button class="btn btn-danger" @click="delWant(todo.id)">删除</button>
        <button v-show="!todo.isEdit" class="btn btn-edit" @click="handleEdit(todo,$event)">编辑</button>
    </li>
    </transition>
</template>

<script>
export default {
    name: "ToDoItem",
    props: ["todo"],
    methods: {
        // 切换勾选
        handleCheck(id){
            // 通知对应id的事件的 isFinish属性 取反
            this.$bus.$emit("changeFinish",id);
        },
        // 删除
        delWant(id){
            if(confirm("确定删除吗?")){
                this.$bus.$emit("del",id);
            }
        },
        handleEdit(todo){
            if (todo.hasOwnProperty("isEdit")){
                todo.isEdit = true;
                // 切换为可编辑模式时自动获取焦点
                // nextTick 所指定的回调会在 DOM 更新完毕后执行
                this.$nextTick(() => {
                    this.$refs.input.focus()
                });
            }else {
                this.$set(todo,"isEdit",true);
                // 切换为可编辑模式时自动获取焦点
                this.$nextTick(() => {
                    this.$refs.input.focus()
                });
            }
        },
        // 失去焦点时真正去修改数据
        handleBlur(todo,event){
            todo.isEdit = false;
            if(!event.target.value.trim()) return alert("请输入些内容");
            this.$bus.$emit("updateTodo",todo.id,event.target.value);
        }
    }
}
</script>





<style scoped>

li:last-child {
    border-bottom: none;
}

li:before {
    content: initial;
}

li button {
    float: right;
    display: none;
    margin-top: 3px;
}

li label li input{
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
}

li label {
    float: left;
    cursor: pointer;
}

li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
}

li:hover {
    background-color: #ddd;
}

li:hover button {
    display: block;
}

/**
    进入的起点,离开的终点
 */
.todo_li-enter,.todo_li-leave-to {
    transform: translateX(100%);
}
/**
    进入的终点,离开的起点
 */
.todo_li-enter-to,.todo_li-leave {
    transform: translateX(0);
}
/**
    整个进入过程中
 */
.todo_li-enter-active,.todo_li-leave-active {
    transition: 0.5s linear;
}


</style>
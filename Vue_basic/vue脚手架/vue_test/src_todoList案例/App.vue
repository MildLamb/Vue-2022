<template>
    <div id="container">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyTop :getObj="addToDo"></MyTop>
                <ToDoList :todos="todos" :changeFinish="changeFinish" :del="del"></ToDoList>
                <MyFooter :todos="todos" :allChange="allChange" :allClear="allClear"></MyFooter>
            </div>
        </div>
    </div>
</template>

<script>
import MyTop from "@/components/MyTop";
import ToDoList from "@/components/ToDoList";
import MyFooter from "@/components/MyFooter";
export default {
    name: "App",
    components: {
        MyTop,
        ToDoList,
        MyFooter
    },
    data(){
        return {
            todos: JSON.parse(localStorage.getItem("todos"))
        }
    },
    methods: {
        // 添加
        addToDo(obj){
            this.todos.push(obj);
        },
        // 修改
        changeFinish(id){
            this.todos.forEach((todo)=>{
                if (todo.id === id){
                    todo.isFinish = !todo.isFinish;
                }
            })
        },
        // 删除
        del(id){
            this.todos = this.todos.filter((todo)=>{
                return todo.id !== id;
            })
        },
        // 全选，全不选
        allChange(sign){
            this.todos.forEach(todo => todo.isFinish = sign);
        },
        // 删除所有完成的事情
        allClear(){
            this.todos = this.todos.filter(todo => todo.isFinish !== true);
        }
    },
    watch: {
        todos: {
            handler(newV){
                localStorage.setItem("todos",JSON.stringify(newV));
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        if (!this.todos) this.todos = [];
    }
}
</script>

<style>

    .todo-container .todo-wrap{
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }

    .todo-container {
        width: 600px;
        margin: 0 auto;
    }


    body{
        background: #fff;
    }
</style>
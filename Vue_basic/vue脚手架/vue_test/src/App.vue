<template>
    <div id="container">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyTop :getObj="addToDo"></MyTop>
                <ToDoList :todos="todos" :changeFinish="changeFinish"></ToDoList>
                <MyFooter></MyFooter>
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
            todos: [{
                id: "001",
                wantDo: "敲代码",
                isFinish: true
            },{
                id: "002",
                wantDo: "玩游戏",
                isFinish: false
            },{
                id: "003",
                wantDo: "睡觉",
                isFinish: false
            }]
        }
    },
    methods: {
        addToDo(obj){
            this.todos.push(obj);
        },
        changeFinish(id){
            this.todos.forEach((todo)=>{
                if (todo.id === id){
                    todo.isFinish = !todo.isFinish;
                }
            })
        }
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
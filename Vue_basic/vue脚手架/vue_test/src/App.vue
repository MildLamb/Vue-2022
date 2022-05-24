<template>
    <div id="container">
        <div class="todo-container">
            <div class="todo-wrap">
                <MyTop :getObj="addToDo"></MyTop>
                <ToDoList :todos="todos"></ToDoList>
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
        },
        // 更新
        updateToDo(id,newDo){
            this.todos.forEach(todo => {
                if (todo.id === id){
                    todo.wantDo = newDo;
                }
            });
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
    },
    mounted() {
        this.$bus.$on("changeFinish",(id)=>{
            this.todos.forEach((todo)=>{
                if (todo.id === id){
                    todo.isFinish = !todo.isFinish;
                }
            });
        });
        this.$bus.$on("del",(id)=>{
            this.todos = this.todos.filter((todo)=>{
                return todo.id !== id;
            });
        });
        this.$bus.$on("updateTodo",this.updateToDo);
    },
    beforeDestroy() {
        this.$bus.$off("changeFinish");
        this.$bus.$off("del");
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

    .btn-danger:hover{
        color: #fff;
        background-color: #bd362f;
    }

    .btn-danger {
        color: #fff;
        background-color: #da4f49;
        border: 1px solid #bd362f;
    }

    .btn-edit {
        color: #fff;
        background-color: #2f97af;
        border: 1px solid #63adaf;
        margin-right: 5px;
    }

    .btn{
        padding: 4px 12px;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255,255,255,0.2),0 1px 2px rgba(0,0,0,0.05);
        border-radius: 4px;
    }
</style>
<template>
    <ul class="todo-main">
        <ToDoItem v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" :changeFinish="changeFinish"></ToDoItem>
    </ul>
</template>

<script>
import ToDoItem from "@/components/ToDoItem";
export default {
    name: "ToDoList",
    components: {
        ToDoItem
    },
    props: ["todos","changeFinish"]
}
</script>

<style scoped>
.todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
}

.todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
}
</style>
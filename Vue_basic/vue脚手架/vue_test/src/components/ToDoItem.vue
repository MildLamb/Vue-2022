<template>
    <li>
        <label>
            <input type="checkbox" :checked="(todo.isFinish === true ? true : false)" @click="handleCheck(todo.id)"/>
            <!-- 使用v-model也可以实现，但不建议，因为vue不建议修改props传递过来的值 -->
            <input type="checkbox" v-model="todo.isFinish"/>
            <span>{{todo.wantDo}}</span>
        </label>
        <button class="btn btn-danger" style="display: none">删除</button>
    </li>
</template>

<script>
export default {
    name: "ToDoItem",
    props: ["todo","changeFinish"],
    methods: {
        handleCheck(id){
            // 通知对应id的事件的 isFinish属性 取反
            this.changeFinish(id);
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
</style>
<template>
    <li>
        <label>
            <input type="checkbox" :checked="(todo.isFinish === true ? true : false)" @click="handleCheck(todo.id)"/>
            <!-- 使用v-model也可以实现，但不建议，因为vue不建议修改props传递过来的值 -->
<!--            <input type="checkbox" v-model="todo.isFinish"/>-->
            <span>{{todo.wantDo}}</span>
        </label>
        <button class="btn btn-danger" @click="delWant(todo.id)">删除</button>
    </li>
</template>

<script>
export default {
    name: "ToDoItem",
    props: ["todo","changeFinish","del"],
    methods: {
        // 切换勾选
        handleCheck(id){
            // 通知对应id的事件的 isFinish属性 取反
            this.changeFinish(id);
        },
        // 删除
        delWant(id){
            if(confirm("确定删除吗?")){
                this.del(id);
            }
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

.btn-danger:hover{
    color: #fff;
    background-color: #bd362f;
}

.btn-danger {
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
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
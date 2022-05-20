<template>
    <div class="todo-footer" v-show="toDoTotal">
        <label>
<!--            <input type="checkbox" :checked="isAll" @click="changeAll"/>-->
            <input type="checkbox" v-model="isAll"/>
        </label>
        <span>
            <span>已完成：{{finishTotal}}</span> / 全部：{{toDoTotal}}
        </span>
        <button class="btn btn-danger" @click="allClear">清除已完成的任务</button>
    </div>
</template>

<script>
export default {
    name: "MyFooter",
    props: ["todos","allChange","allClear"],
    computed: {
        isAll: {
            get() {
                return this.finishTotal === this.toDoTotal && this.toDoTotal > 0;
            },
            set(sign){
                this.allChange(sign);
            }
        },
        toDoTotal(){
            return this.todos.length;
        },
        finishTotal: {
            /**
             * reduce(pre,current)
             * pre 是上一次的返回值，初始值是第二个参数，这里是0
             * current 是todos中的每一项
             */
            get(){
                return this.todos.reduce((pre,todo)=>{
                    return pre + (todo.isFinish === true ? 1 : 0);
                },0)
            }
        }
    },
    methods: {
        changeAll(event){
            this.allChange(event.target.checked);
        }
    }
}
</script>

<style scoped>
.todo-footer{
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
}

.todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
}

.todo-footer label input{
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
}

.todo-footer button {
    float: right;
    margin-top: 5px;
}


.btn:focus {
    outline: none;
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
    display: inline-block;
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
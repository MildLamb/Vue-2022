<template>
    <div class="todo-header">
        <input type="text" placeholder="请输入你的任务，按回车确认" @keyup.enter="addToDo()" ref="userIn"/>
    </div>
</template>

<script>
import {nanoid} from "nanoid"
export default {
    name: "MyTop",
    methods: {
        addToDo(){
            if(this.$refs.userIn.value.trim() != "") {
                // 将用户的输入包装为一个 todoObj 对象
                const todoObj = {
                    id: nanoid(),
                    wantDo: this.$refs.userIn.value,
                    isFinish: false
                }
                /**
                 * getObj 方法来自于总组件App
                 * - todoObj： 把你需要给App传递的对象当作参数传过去
                 */
                this.getObj(todoObj);
                this.$refs.userIn.value = "";
            }
        }
    },
    /**
     * 接收自于总组件App的getObj方法
     */
    props: ["getObj"]
}
</script>

<style scoped>
.todo-header input:focus {
    outline: none;
    border-color: rgba(82,168,236,0.8);
    box-shadow: inset 0 1px 1px rgba(0,0,0,0.075),0 0 8px rgba(82,168,236,0.6);
}

.todo-header input{
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
}
</style>
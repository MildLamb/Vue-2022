<template>
    <div>
        <div class="block">
            <span class="demonstration">带快捷选项</span>
            <El_DatePicker
                v-model="value2"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
            </El_DatePicker>
        </div>
        <button>原生的按钮</button>
        <input type="text"><br><br>
        <El_Button type="success" round>Element-UI按钮</El_Button>
    </div>
</template>

<script>
export default {
    name: "App",
    components: {},
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            value1: '',
            value2: '',
        };
    }
}
</script>

<style scoped>
</style>
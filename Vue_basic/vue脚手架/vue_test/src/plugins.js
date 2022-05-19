export default {
    install(Vue){
        console.log(Vue);
        /**
         * 配置全局的过滤器
         */
        Vue.filter("mySplit",function (value) {
            return value.split("-")[0];
        });

        /**
         * 配置全局指令
         */
        Vue.directive("fbind",{
            // 指令与元素成功绑定时
            bind(element,binding){
                element.value = "1902524390";
            },
            // 指令所在元素被插入页面时
            inserted(element,binding){
                element.focus();
            },
            // 指令所在的模板被重新解析时
            update(element,binding){
                element.value = binding.value;
            }
        });

        // 全局混入
        Vue.mixin({
            data(){
                return {
                    level: 7
                }
            }
        });

        Vue.prototype.test = function (){
            console.log("插件中添加方法");
        }
    }
}
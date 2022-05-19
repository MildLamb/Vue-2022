export default {
    install(VueConstruct){
        console.log(VueConstruct);
        /**
         * 配置全局的过滤器
         */
        VueConstruct.filter("mySplit",function (value) {
            return value.split("-")[0];
        });

        /**
         * 配置全局指令
         */
        VueConstruct.directive("fbind",{
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
        VueConstruct.mixin({
            data(){
                return {
                    level: 7
                }
            }
        });
    }
}
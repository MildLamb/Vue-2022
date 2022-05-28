// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from "@/pages/About";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";


// 创建并暴露一个路由器
export default new VueRouter({
    routes: [
        {
            name: "guanyu",
            path: "/about",
            component: About
        },
        {
            path: "/home",
            component: Home,
            children: [
                {
                    path: "news",
                    component: News
                },
                {
                    path: "message",
                    component: Message,
                    children: [
                        {
                            name: "xiangqing",
                            path: "detail/:rid/:title",
                            component: Detail,
                            // props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传递给当前配置props配置项所在的组件,传递的是死数据，用的少
                            /*props: {
                                name: "kindred",
                                age: 1500
                            }*/

                            // props第二种写法, 值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传递给当前配置props配置项所在的组件
                            // props: true

                            /* props第三种写法，值为函数，函数的返回值配置为对象，对象中匹配属性的值
                                这种方式就可以匹配 query 属性
                             */

                            /*props($route){
                                return {
                                    rid: $route.params.rid,
                                    title: $route.params.title
                                }
                            }*/

                            // 使用解构赋值简化第三种写法 ,假如想要query中的参数  {query},  意思是从 $route 中提取 query属性作为参数
                            props({params}){
                                return {
                                    rid: params.rid,
                                    title: params.title
                                }
                            }
                        }
                    ]
                    /*
                    query传递参数
                    children: [
                        {
                            name: "xiangqing",
                            path: "detail",
                            component: Detail
                        }
                    ]*/
                }
            ]
        }
    ]
})
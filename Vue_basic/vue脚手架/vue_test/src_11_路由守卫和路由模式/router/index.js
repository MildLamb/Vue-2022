// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
import About from "@/pages/About";
import Home from "@/pages/Home";
import News from "@/pages/News";
import Message from "@/pages/Message";
import Detail from "@/pages/Detail";


// 创建并暴露一个路由器
const router = new VueRouter({
    mode: "hash",
    routes: [
        {
            name: "guanyu",
            path: "/about",
            component: About,
            meta: {
                isAuth: false,
                title: "关于"
            }
        },
        {
            name: "zhuye",
            path: "/home",
            component: Home,
            meta: {
                title: "主页"
            },
            children: [
                {
                    name: "xinwen",
                    path: "news",
                    component: News,
                    meta: {
                        isAuth: true,
                        title: "新闻介绍"
                    },
/*                    /!**
                     * 独享路由守卫
                     *!/
                    beforeEnter: (to, from, next) => {
                        console.log("独享路由守卫",to,from,next);
                        if(to.meta.isAuth){
                            if (localStorage.getItem("master") === "qsj"){
                                next();
                            } else {
                                alert("权限名不对");
                            }
                        } else {
                            next();
                        }
                    }*/
                },
                {
                    name: "xiaoxi",
                    path: "message",
                    component: Message,
                    meta: {
                        isAuth: true,
                        title: "消息"
                    },
                    children: [
                        {
                            name: "xiangqing",
                            path: "detail/:rid/:title",
                            component: Detail,
                            meta: {
                                title: "详情",
                                isAuth: true
                            },
                            // 使用解构赋值简化第三种写法 ,假如想要query中的参数  {query},  意思是从 $route 中提取 query属性作为参数
                            props({params}){
                                return {
                                    rid: params.rid,
                                    title: params.title
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});





/**
 * 添加路由守卫
 * - 全局前置路由守卫
 */
router.beforeEach((to,from,next)=>{
    console.log("前置路由守卫",to,from,next);
    if(to.meta.isAuth){
        if (localStorage.getItem("master") === "qsj"){
            next();
        } else {
            alert("权限名不对");
        }
    } else {
        next();
    }

})

/**
 * 后置路由守卫：初始化的时候被调用，每次路由切换之后被调用
 */
router.afterEach((to,from,next)=>{
    document.title = to.meta.title || "Vue学习首页";
    console.log("后置路由守卫",to,from,next);
})

export default router;
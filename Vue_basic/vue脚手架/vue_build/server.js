const express = require("express")
const history = require("connect-history-api-fallback");

const app = express()

app.use(history());
// 指定静态资源路径
app.use(express.static(__dirname+'/static'));

app.get("/role",(req,resp) => {
    resp.send({
        name: "kindred",
        age: 1500
    })
})

app.listen(2345,(err)=>{
    if (!err) console.log("服务器启动成功了");
})
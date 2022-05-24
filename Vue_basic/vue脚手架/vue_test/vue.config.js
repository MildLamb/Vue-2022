const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  // 关闭语法检查
  // runtimeCompiler: true

  // 开启代理服务器(方式一)
  /*devServer: {
    proxy: "http://localhost:4567"
  }*/
  // 开启代理服务器(方式二)
/*  devServer: {
    proxy: {
      "/info": {
        target: "http://localhost:4567",
        // 代理服务器给真正的资源服务器请求的时候不需要前缀了
        pathRewrite: {"^/info":""},
        ws: true,
        changeOrigin: true   // 用于控制请求头中host值是 源还是目标服务器
      },
      "/m_info": {
        target: "http://localhost:8081",
        pathRewrite: {"^/m_info":""}
      }
    }
  }*/
});

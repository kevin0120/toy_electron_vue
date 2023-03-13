const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: '.',
    outputDir: 'dist', //输出路径
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },

    //配置跨域
    devServer: {
        host: "0.0.0.0",
        port: 8090,
        proxy: {
            // 配置反向代理服务器,target是最终要访问的服务器
            "/api": {
                target: "http://211.254.254.251:9001/v2", //代理的后台地址
                ws: false,
                changOrigin: false,
                pathRewrite: {
                    "^/api": ''
                }
            },
            "/websocket": {
                target: "ws://211.254.254.251:9001/", //代理的后台地址
                ws: true,
                changOrigin: false,
                pathRewrite: {
                    "^/websocket": ''
                }
            },
        }
    },
})

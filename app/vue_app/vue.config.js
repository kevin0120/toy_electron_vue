const {defineConfig} = require('@vue/cli-service')
const path = require("path");
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
        },
        // // 当使用只有入口的字符串格式时，
        // // 模板会被推导为 `public/subpage.html`
        // // 并且如果找不到的话，就回退到 `public/index.html`。
        // // 输出文件名会被推导为 `subpage.html`。
        // subpage: 'src/subpage/main.js'
    },

    // css: {
    //     loaderOptions: {
    //         scss: {
    //             // 这里的选项会传递给 css-loader
    //         },
    //         sass: {
    //             // 这里的选项会传递给 postcss-loader
    //         }
    //     }
    // },

    configureWebpack: {
        resolve: {
            extensions: ['.js', '.ts', '.vue', '.json'],
            fallback: {
                path: false,
                "crypto": false,
                "util": false
            },
            alias: {
                '@': path.join(__dirname, './src/'),
            }

        },
        // module: {
        //     rules: [
        //         {
        //             test: /\.tsx?$/,
        //             loader: 'ts-loader',
        //             options: {appendTsSuffixTo: [/\.vue$/]}
        //         }
        //     ]
        // },
        devtool: "source-map",
    },
    chainWebpack: config => {
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,

        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(path.resolve('./src/res/svg')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });
        // config.module
        //     .rule('ts')
        //     .use('ts-loader')
        //     .loader('ts-loader')
        //     .tap(options => {
        //         options.appendTsSuffixTo = [/\.vue$/]
        //         return options
        //     })
    },

    //配置跨域
    devServer: {
        host: "0.0.0.0",
        port: 8092,
        open: true,
        historyApiFallback: true, //vue 路由history模式 devServer怎么配置
        proxy: {
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

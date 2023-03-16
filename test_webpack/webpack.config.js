const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: "./test_webpack/src/index.js",
    output: {
        path: path.join(__dirname, './dist'),
        filename: "main.js"
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './src/')
        }

    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules[^(react\-pdf)]/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './test_webpack/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
            "/websocket": {
                target: "ws://211.254.254.251:9001/", //代理的后台地址
                ws: true,
                changOrigin: false,
                pathRewrite: {
                    "^/websocket": ''
                }
            },
        },
        // contentBase: resolve(__dirname, 'dist'), // 运行项目的目录
        open: true, // 自动打开浏览器
        compress: true, // 启动gzip压缩
        port: "auto", // 端口号
        hot: true // 开启热模替换功能 HMR
    }





};

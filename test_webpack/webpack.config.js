const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        index: "./test_webpack/entry/index.js",
        demo: "./test_webpack/entry/demo.js",
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: "[name].js"
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, './demos')
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
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // webpack5已经升级
            {
                test: /\.(png|jpg)$/,
                type: 'asset/resource'
            },

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './test_webpack/entry/index.html', // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
        }),

    ],
    devServer: {
        proxy: {
            '/api': {
                target: 'http://211.254.254.251:3000',
                pathRewrite: {'^/api': ''},
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
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        // contentBase: resolve(__dirname, 'dist'), // 运行项目的目录
        open: true, // 自动打开浏览器
        compress: true, // 启动gzip压缩
        port: "auto", // 端口号
        hot: true // 开启热模替换功能 HMR
    }
};

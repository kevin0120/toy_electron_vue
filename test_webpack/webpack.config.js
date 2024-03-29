const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: {
    index: "./test_webpack/entry/index.js",
    demo: "./test_webpack/entry/demo.js",
    vue: "./test_webpack/entry/vue.js",
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "./demos"),
      "V@": path.join(__dirname, "./res"),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules[^(react\-pdf)]/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /.vue$/,
        loader: "vue-loader",
      },

      {
        test: /.svg$/,
        use: {
          loader: "svg-sprite-loader",
          options: {
            symbolId: "icon-[name]",
          },
        },
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      // webpack5已经升级
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./test_webpack/entry/index.html", // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: true,
    }),

    // 与vue-loader结合使用
    new VueLoaderPlugin(),
  ],
  devServer: {
    proxy: {
      "/api": {
        target: "http://211.254.254.251:3000",
        pathRewrite: { "^/api": "" },
      },
      "/websocket": {
        target: "ws://211.254.254.251:9001/", //代理的后台地址
        ws: true,
        changOrigin: false,
        pathRewrite: {
          "^/websocket": "",
        },
      },
    },
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // contentBase: resolve(__dirname, 'dist'), // 运行项目的目录
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
    port: "auto", // 端口号
    hot: true, // 开启热模替换功能 HMR
  },
};

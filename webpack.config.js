const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./test_webpack/entry/index.js",
    output: {
        path: path.join(__dirname, 'test_webpack/dist'),
        filename: "main.js"
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
    }
};

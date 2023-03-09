const path = require("path");

module.exports = {
    mode: 'development',
    entry: "./test_webpack/src/index.js",
    output: {
        path: path.join(__dirname, 'test_webpack/dist'),
        filename: "main.js"
    },
    module: {
    }
};

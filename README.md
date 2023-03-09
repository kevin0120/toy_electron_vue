# electron-quick-start
A basic Electron application needs just these files:

- `package.json` - Points to the app's main file and lists its details and dependencies.
- `main.js` - Starts the app and creates a browser window to render HTML. This is the app's **main process**.
- `index.html` - A web page to render. This is the app's **renderer process**.
- `preload.js` - A content script that runs before the renderer process loads.

```bash
# Clone this repository
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
# Run the app
npm start
```
Electron打包详解 推荐Forge 方式
```bash
# https://www.electronforge.io/cli#package
# https://www.electron.build/cli
```

Electron 变量管理
```bash
1.script 中 传递到process.env中
cross-env Project_Entrance=vue-app

2.运行时获取不同的变量文件 loadEnv
const {loadEnv} = require('vite');
let localEnv = loadEnv(process.env.Project_Entrance, "./", '')
```
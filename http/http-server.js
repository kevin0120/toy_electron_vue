const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// 创建 Express 应用程序对象
const app = express();

const {router_local, ws_local} = require('./local');
app.use('/local', router_local);

const router_vue_app = require('./vue_app');
app.use('/vue_app', router_vue_app);

const {router_vue_app_workcenter, ws_vue_app_workcenter} = require('./vue_app_workcenter');
app.use('/vue_app_workcenter', router_vue_app_workcenter);

app.use((req, res, next) => {
    // 设置 CORS 响应头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next()
})

// 创建 HTTP 服务器
const server = http.createServer(app);
// 创建 WebSocket 服务器
const wss = new WebSocket.Server({server});
// 监听 WebSocket 连接事件
wss.on('connection', (ws) => {
    console.log('WebSocket connected');
    // 监听 WebSocket 消息事件
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        const data = JSON.parse(message);
        switch (data.type) {
            case 'local':
                ws_local(data, ws);
                break;
            case 'vue_app_workcenter':
                ws_vue_app_workcenter(data, ws);
                break;
            default:
                console.log(`Unknown message type: ${data.type}`);
        }
    });
});

// 启动 HTTP 服务器和 WebSocket 服务器
server.listen(7000, () => {
    console.log('Server started on port 7000');
});
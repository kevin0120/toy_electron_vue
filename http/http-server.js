const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// 创建 Express 应用程序对象
const app = express();

// 创建 HTTP 服务器
const server = http.createServer(app);

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ server });

// 处理 GET /hello 请求
app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

// 监听 WebSocket 连接事件
wss.on('connection', (ws) => {
    console.log('WebSocket connected');

    // 监听 WebSocket 消息事件
    ws.on('message', (data) => {
        console.log(`Received message: ${data}`);

        // 发送消息给客户端
        ws.send(`You said: ${data}`);
    });
});

// 启动 HTTP 服务器和 WebSocket 服务器
server.listen(7000, () => {
    console.log('Server started on port 7000');
});
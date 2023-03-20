const express = require('express');

const router = express.Router();

// 处理 GET /hello 请求
router.get('/hello', (req, res) => {
    const now = new Date().toLocaleTimeString()
    res.send(`Hello, Http!  ${now}`);
});
function ws_handle(data, ws) {
    // 监听 WebSocket 消息事件
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // 发送消息给客户端
        const now = new Date().toLocaleTimeString()
        ws.send(`Hello websocket ${now}`)
    });
}

module.exports = {
    router_vue_app_workcenter: router,
    ws_vue_app_workcenter: ws_handle
}
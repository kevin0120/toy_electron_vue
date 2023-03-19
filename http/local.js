const express = require('express');

const router = express.Router();

// 处理 GET /hello 请求
router.get('/hello', (req, res) => {
    const now = new Date().toLocaleTimeString()
    res.send(`Hello, Http!  ${now}`);
});


module.exports=router
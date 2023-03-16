/** websocket 相关类型定义 **/
export var SendMsgType;
(function (SendMsgType) {
    SendMsgType["SUBSCRIBE"] = "subscribe";
    SendMsgType["CONNECTION_CLOSE"] = "connection_close"; // 关闭连接
})(SendMsgType || (SendMsgType = {}));
export var ReplayMsgType;
(function (ReplayMsgType) {
    ReplayMsgType["CONNECTED"] = "connected";
    ReplayMsgType["COLLECTION"] = "collection";
    ReplayMsgType["PROBA_RESULT"] = "proba_result_publish"; // 贴合点信息以及分析结果信息
})(ReplayMsgType || (ReplayMsgType = {}));
export var SubscribeType;
(function (SubscribeType) {
    SubscribeType["COLLECTION"] = "collection"; // 订阅拧紧结果数据
})(SubscribeType || (SubscribeType = {}));

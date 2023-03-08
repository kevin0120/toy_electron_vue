/** websocket 相关类型定义 **/

export enum SendMsgType {
  SUBSCRIBE = 'subscribe', // 订阅
  CONNECTION_CLOSE = 'connection_close' // 关闭连接
}

export enum ReplayMsgType {
  CONNECTED = 'connected', // 建立连接
  COLLECTION = 'collection', // 响应订阅的拧紧结果数据
  PROBA_RESULT = 'proba_result_publish' // 贴合点信息以及分析结果信息
}

export enum SubscribeType {
  COLLECTION = 'collection' // 订阅拧紧结果数据
}


// 获取本地缓存里面键的值
export function getItem(params) {
    return localStorage.getItem(params)
}

// 获取本地缓存里面键的值
export function hasItem(params) {
    return localStorage.getItem(params)
}

// 删除本地缓存里面键的值
export function removeItem(params) {
    localStorage.removeItem(params);
}
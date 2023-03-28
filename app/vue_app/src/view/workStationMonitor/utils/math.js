//随机生成十六进制颜色
export function randomHexColor() {
    let hex = Math.floor(Math.random() * 16777216).toString(16);
    //生成ffffff以内16进制数
    while (hex.length < 6) {
        //while循环判断hex位数，少于6位前面加0凑够6位
        hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
}
/**
 * @function 随机生成十六进制颜色数组
 * @description 该函数生成一个随机的16进制颜色数组
 * @param len {number} number 生成数组的长度
 * @return string[] 返回一个字符串数组
 * @author lixin
 * @date 2022/8/26
 * @version 1.0.0
 * @example
 */
export function randomHexColorList(len) {
    const colorList = [];
    for (let i = 0; i < len; i += 1) {
        colorList.push(randomHexColor());
    }
    return colorList;
}
// 生成min~max之间的随机整数
export function randomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// 计算方差
export function variance(numbers) {
    let mean = 0;
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    mean = sum / numbers.length;
    sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += Math.pow(numbers[i] - mean, 2);
    }
    return sum / numbers.length;
}
// 计算均值和标准差
export function getX(data) {
    const len = data?.length; //数组长度
    if (len < 1) {
        return {
            avg: 0,
            std: 0
        };
    }
    let sum = 0; //值相加的总和
    let sums = 0; //值-平均的总和
    for (let i = 0; i < len; i++) {
        sum += data[i]; //总和
    }
    //排序
    const arr = data;
    arr.sort(function (a, b) {
        return a - b;
    });
    // const min = arr[0]; //最小值
    // const max = arr[arr.length - 1]; //最大值
    const avg = Number((sum / len).toFixed(2)); //平均值
    for (let i = 0; i < len; i++) {
        sums += (Number(arr[i]) - avg) * (Number(arr[i]) - avg);
    }
    const std = Number(Math.sqrt(sums / len).toFixed(2)); //标准差 保留两位有效小数
    return {
        avg,
        std
    };
}
export function bytesToSize(size) {
    let Str = '';
    if (size < 0.1 * 1024) {
        // 小于0.1KB，则转化成B
        Str = size.toFixed(2) + 'B';
    }
    else if (size < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        Str = (size / 1024).toFixed(2) + 'KB';
    }
    else if (size < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        Str = (size / (1024 * 1024)).toFixed(2) + 'MB';
    }
    else {
        // 其他转化成GB
        Str = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    }
    // 转成字符串
    const sizeStr = Str + '';
    // 获取小数点处的索引
    const index = sizeStr.indexOf('.');
    // 获取小数点后两位的值
    const dou = sizeStr.substr(index + 1, 2);
    // 判断后两位是否为00，如果是则删除00
    if (dou === '00')
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
    return sizeStr;
}

function formatDate(date) {
    const [yyyy, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    let MM = String(month);
    let DD = String(day);
    if (month < 10) {
        MM = '0' + month;
    }
    if (day < 10) {
        DD = '0' + day;
    }
    return new Date(`${yyyy}-${MM}-${DD}T00:00:00`);
}
/**
 * @function 获取一段时间范围数组
 * @description 该函数以当前时间为准返回一个时间范围数组
 * @param dateNow {Date} : 当前时间
 * @param intervalDays {number} ：间隔天数
 * @param bolPastTime {boolean}  ：Boolean,判断在参数date之前，还是之后
 * @return Date[] 返回一个Date数组
 * @example
 */
export function getDateRange(dateNow, intervalDays, bolPastTime) {
    const oneDayTime = 24 * 60 * 60 * 1000;
    const list = [];
    let lastDay;
    if (bolPastTime) {
        //前时间范围
        lastDay = new Date(dateNow.getTime() - intervalDays * oneDayTime);
        list.push(formatDate(lastDay));
        list.push(formatDate(dateNow));
    }
    else {
        //后时间范围
        lastDay = new Date(dateNow.getTime() + intervalDays * oneDayTime);
        list.push(formatDate(dateNow));
        list.push(formatDate(lastDay));
    }
    return list;
}

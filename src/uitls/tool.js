/**
 * 传入时间戳，转换指定的时间格式
 * @param {Number} val      时间戳
 * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
 * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
 */
export function switchTime (val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') {
  // 将字符串转换成数字
  const timeStamp = +new Date(val)

  // 如果转换成数字出错
  if (!timeStamp) {
    return val
  }
  let str
  // 得到时间字符串
  const dateStr = new Date(timeStamp)
  str = dateType.replace('YYYY', dateStr.getFullYear())
  str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1))
  str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate())
  str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours())
  str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes())
  str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds())

  return str
}

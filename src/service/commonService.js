/*
 * @Author: Qian.qianchen
 * @Date: 2021-04-29 13:58:11
 * @LastEditors: Qian.qianchen
 * @Description: 公共方法
 * @FilePath: /vue3-pro/src/service/commonService.js
 */

/**
 * @description: 字符串拼接
 * @param {*} array 数组
 * @param {*} property 需要拼接的属性名
 * @param {*} symbol 拼接的连接符
 * @return {*}
 */ 
export const spliceString = (array, property, symbol) => {
  if (array.length == 0) return ''
  if (array.length == 1) return array[0][property]

  const _str = array.map(_item => {
    return _item[property]
  }).join(symbol)
  return _str
}
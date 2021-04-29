/*
 * @Author: Qian.qianchen
 * @Date: 2021-04-27 15:38:03
 * @LastEditors: Qian.qianchen
 * @Description: 组件全局注入脚本
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/components/index.js
 */

 /**
  * 首字母转大写
  * @param str 字符串
  * @example heheHaha
  * @return {string} HeheHaha
  */
 function capitalizeFirstLetter(str) {
  return str.slice(0);
}

/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName(str) {
  return (
    /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
  );
}

const requireComponent = require.context("./", true, /\.vue$/);

export default {
  install(app) {
    // 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
    requireComponent.keys().forEach(filePath => {
      console.log(filePath)
      const componentConfig = requireComponent(filePath);
      console.log(componentConfig)
      const fileName = validateFileName(filePath);
      const componentName =
        fileName.toLowerCase() === "index"
          ? capitalizeFirstLetter(componentConfig.default.name)
          : fileName;
      app.component(componentName, componentConfig.default || componentConfig);
      // app.config.globalProperties.$ask = askSingleton;
      // app.config.globalProperties.$msg = toastSingleton;
    });
  }
};
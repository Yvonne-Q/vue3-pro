/*
 * @Author: Qian.qianchen
 * @Date: 2021-04-27 11:16:27
 * @LastEditors: Qian.qianchen
 * @Description: 文件描述
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/vue.config.js
 */
const path = require('path')

module.exports = {
  publicPath: '/',
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // webpack-dev-server 相关配置
  devServer: {
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
  },

}

function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/less/public.less'), // 需要全局导入的less
      ],
    })
}
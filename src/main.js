/*
 * @Author: Qian.qianchen
 * @Date: 2021-04-27 11:16:27
 * @LastEditors: Qian.qianchen
 * @Description: 文件描述
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from './components/index'

createApp(App).use(store).use(router).use(components).mount('#app')

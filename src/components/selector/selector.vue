<!--
 * @Author: Qian.qianchen
 * @Date: 2021-04-28 17:32:05
 * @LastEditors: Qian.qianchen
 * @Description: 下拉组件
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/components/selector/selector.vue
-->
<template>
  <div class="selector_container">
    <div class="selector_content"
         v-text="showContent"></div>
    <div class="selector_list">
      <ul class="list_container">
        <li class="select_item"
            v-for="item in items"
            :key="item[value]">
          <p class="item_label"
             v-if="!isShowBox"
             v-text="item[label]"></p>
          <radio v-if="!isMulti&&isShowBox"
                 :label="item[label]"></radio>
          <checkBox v-if="isMulti&&isShowBox"
                    :label="item[label]"></checkBox>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import {spliceString} from '@/service/commonService.js'
const selector = defineComponent({
  props: {
    // 下拉列表数据
    items: {
      type: Array,
      default() {
        return []
      }
    },
    // 选中的数据
    selectedItems: {
      type: Array,
      default() {
        return []
      }
    },
    // 显示的值
    label: {
      type: String,
      default: 'name'
    },
    // 对应的key
    value: {
      type: String,
      default: 'value'
    },
    // 是否为多选
    isMulti: {
      type: Boolean,
      default: false
    },
    // 是否展示单选/多选按钮
    isShowBox: {
      type: Boolean,
      default: false
    },
    // placeholder
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 多选时显示的分隔符
    symbol:{
      type:String,
      default:','
    }
  },
  setup(props) {
    // 展示的内容
    const showContent = ref('')
    /**
     * @description: 初始化
     * @param {*}
     * @return {*}
     */
    const init = () => {
      showContent.value = props.selectedItems.length == 0?props.props.placeholder:spliceString(props.selectedItems,props.label,props.symbol)
    }
    onMounted(() => {
      init()
    })
    return { showContent }
  }
})
export default selector
</script>
<style lang="less" scoped>
.selector_container {
  display: inline-block;
  position: relative;
  .selector_content {
    width: 200px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: white;
  }
  .selector_list {
    position: absolute;
    top: 100%;
    left: 0px;
  }
}
</style>
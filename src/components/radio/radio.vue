<!--
 * @Author: Qian.qianchen
 * @Date: 2021-04-27 14:00:24
 * @LastEditors: Qian.qianchen
 * @Description: 单选组件
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/components/radio/radio.vue
-->
<template>
  <div class="pointer radio_container"
       :class="{'disabled': disabled}"
       @click="checkToggle">
    <div class="radio"
         :class="{'checked': isChecked}"></div>
    <span class="radio_label"
          v-if="label"
          v-text="label"></span>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
const radio = defineComponent({
  props: {
    isChecked: {
      //判断是否选中
      type: Boolean,
      default: false
    },
    label: {
      //对应显示的名称
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    /**
     * @description: 选中/取消选中
     * @param {*}
     * @return {*}
     */
    const checkToggle = () => {
      if (props.disabled) return
      emit('change')
    }
    return { checkToggle }
  }
})
export default radio
</script>
<style lang="less" scoped>
.radio_container {
  display: inline-block;
  .radio {
    display: inline-block;
    vertical-align: middle;
    width: 10px;
    height: 10px;
    border: 1px solid #ccc;
    border-radius: 50%;
    margin-right: 5px;
    &.checked {
      border-color: @activeColor;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: @activeColor;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
  .radio_label {
    color: #333;
    &:hover {
      color: @activeColor;
    }
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
}
</style>
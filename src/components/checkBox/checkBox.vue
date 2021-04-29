<!--
 * @Author: Qian.qianchen
 * @Date: 2021-04-28 13:53:21
 * @LastEditors: Qian.qianchen
 * @Description: 多选按钮组件
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/components/checkBox/checkBox.vue
-->
<template>
  <div class="pointer check_box_container"
       :class="{'disabled': disabled}"
       @click="checkToggle">
    <div class="check_box"
         :class="{'checked': isChecked}"></div>
    <span class="label"
          v-if="!!label"
          v-text="label"></span>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
const checkBox = defineComponent({
  props: {
    // 是否选中
    isChecked: {
      type: Boolean,
      default: false
    },
    // 多选框显示的中文
    label: {
      type: String,
      default: ''
    },
    disabled: {
      // 是否不可用
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
export default checkBox
</script>
<style lang="less" scoped>
.check_box_container {
  display: inline-block;
  .check_box {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #ccc;
    margin-right: 5px;
    &.checked {
      position: relative;
      border-color: @activeColor;
      &::before {
        width: 6px;
        height: 6px;
        border-radius: 2px;
        background-color: @activeColor;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .label {
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
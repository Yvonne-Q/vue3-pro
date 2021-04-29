<!--
 * @Author: Qian.qianchen
 * @Date: 2021-04-27 11:21:36
 * @LastEditors: Qian.qianchen
 * @Description: 组件封装demo
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/views/Demo.vue
-->
<template>
  <div class="demo_container">
    <div class="demo_item">
      <radio :isChecked="isRadioChecked == 1"
             label="单选按钮1"
             @change="changeRadio(1)"></radio>
      <radio :isChecked="isRadioChecked == 2"
             label="单选按钮2"
             :disabled="true"></radio>
    </div>
    <div class="demo_item">
      <checkBox :isChecked="isChecked(1)"
                label="多选按钮1"
                @change="changeCheckBox(1)"></checkBox>
      <checkBox :isChecked="isChecked(2)"
                label="多选按钮2"
                @change="changeCheckBox(2)"></checkBox>
    </div>
    <div class="demo_item">
      <selector :items="selectorItems"
                :selectedItems="selectedItems"
                @change="selectItem"></selector>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue'
const demo = defineComponent({
  setup() {
    const isRadioChecked = ref(2)
    /**
     * @description: 单选选中/取消
     * @param {*}
     * @return {*}
     */
    const changeRadio = value => {
      isRadioChecked.value = value
    }

    const checkBoxChecked = ref([])
    /**
     * @description: 判断多选按钮是否选中
     * @param {*} value
     * @return {*}
     */
    const isChecked = value => {
      return checkBoxChecked.value.some(_item => {
        return _item == value
      })
    }
    /**
     * @description: 多选选中取消选中
     * @param {*} value
     * @return {*}
     */
    const changeCheckBox = value => {
      if (isChecked(value)) {
        checkBoxChecked.value = checkBoxChecked.value.filter(_item => {
          return _item != value
        })
      } else {
        checkBoxChecked.value = [...checkBoxChecked.value, value]
      }
    }
    // 下拉列表
    const selectorItems = reactive([
      {
        name: '选项1',
        value: 1
      },
      {
        name: '选项2',
        value: 2
      },
      {
        name: '选项3',
        value: 3
      },
      {
        name: '选项4',
        value: 4
      },
      {
        name: '选项5',
        value: 5
      }
    ])
    // 下拉选中的数据
    let selectedItems = reactive([
      {
        name: '选项1',
        value: 1
      }
    ])

    /**
     * @description: 下拉框选中回调
     * @param {*} items
     * @return {*}
     */
    const selectItem = items => {
      selectedItems.splice(0,selectedItems.length)
      selectedItems.push(...items)
      console.log(items)
    }
    return {
      isRadioChecked,
      changeRadio,
      checkBoxChecked,
      isChecked,
      changeCheckBox,
      selectorItems,
      selectedItems,
      selectItem
    }
  }
})
export default demo
</script>
<style lang="less" scoped>
.demo_container {
  .demo_item {
    margin: 20px 40px;
    .radio_container {
      margin-right: 15px;
    }
    .check_box_container {
      margin-right: 15px;
    }
  }
}
</style>
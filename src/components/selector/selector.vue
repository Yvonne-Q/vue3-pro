<!--
 * @Author: Qian.qianchen
 * @Date: 2021-04-28 17:32:05
 * @LastEditors: Qian.qianchen
 * @Description: 下拉组件
 * @FilePath: /yicc-bigscreen/Users/qianqianchen/resource/vue/vue3-pro/src/components/selector/selector.vue
-->
<template>
  <div class="selector_container">
    <input class="selector_content"
           :placeholder="placeholder"
           readonly
           v-model="showContent"
           @click="showToggle" />
    <div class="selector_list"
         v-if="isShow">
      <ul class="list_container">
        <li class="pointer select_item"
            :class="{'active': isSelected(item)}"
            v-for="item in items"
            :key="item[value]">
          <p class="item_label"
             @click="selectItem(item)"
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
import { defineComponent, ref, onMounted, reactive } from 'vue'
import { spliceString } from '@/service/commonService.js'
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
    symbol: {
      type: String,
      default: ','
    }
  },
  setup(props, { emit }) {
    // 展示的内容
    let showContent = ref('')
    // 是否展示下拉 默认收起
    const isShow = ref(false)

    let selectedArray = reactive([])
    /**
     * @description: 初始化
     * @param {*}
     * @return {*}
     */
    const init = () => {
      selectedArray.push(...props.selectedItems)
      showContent.value =
        selectedArray.length == 0
          ? ''
          : spliceString(selectedArray, props.label, props.symbol)
    }

    /**
     * @description: 下拉列表显示/隐藏
     * @param {*}
     * @return {*}
     */
    const showToggle = () => {
      isShow.value = !isShow.value
    }
    /**
     * @description: 判断选项是否选中
     * @param {*} item 选项
     * @return {*}
     */
    const isSelected = item => {
      return selectedArray.some(_item => {
        return _item[props.value] == item[props.value]
      })
    }
    /**
     * @description: 选中/取消选中
     * @param {*} item 列表项
     * @return {*}
     */
    const selectItem = item => {
      if (isSelected(item)) {
        selectedArray = selectedArray.filter(_item => {
          return _item[props.value] != item[props.value]
        })
      } else if (props.isMulti) {
        selectedArray.push(item)
      } else {
        selectedArray.splice(0, selectedArray.length)
        selectedArray.push(item)
      }
      showContent.value = spliceString(selectedArray, props.label, props.symbol)
      emit('change', selectedArray)
      showToggle()
    }
    onMounted(() => {
      init()
    })
    return { showContent, isShow, showToggle, isSelected, selectItem }
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
    padding: 0 15px;
    box-sizing: border-box;
  }
  .selector_list {
    position: absolute;
    top: 100%;
    left: 0px;
    width: 100%;
    max-height: 400px;
    border: 1px solid #ccc;
    border-radius: 2px;
    background-color: white;
    box-shadow: 0 0 5px #ccc;
    box-sizing: border-box;
    .list_container {
      .select_item {
        font-size: 14px;
        transition: all 0.5s ease;
        .item_label {
          padding: 8px 15px 8px 30px;
        }

        &.active {
          color: @activeColor;
          .item_label {
            position: relative;
            &::before {
              content: '\2713';
              position: absolute;
              top: 50%;
              left: 10px;
              color: @activeColor;
              transform: translateY(-50%);
            }
          }
        }

        &:hover {
          background-color: @activeColor;
          color: white;
        }
      }
    }
  }
}
</style>
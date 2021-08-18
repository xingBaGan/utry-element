<template>
  <el-table v-bind="$props" ref="multipleTable" v-if="header.length" @selection-change="handleSelectionChange">
    <el-table-column
      v-if="selection"
      type="selection"
      :selectable="selectable"
      align="center"
      width="55">
    </el-table-column>
    <slot name="left"></slot>
    <slot :name="h[name]" :data="h" v-for="h in header">
      <el-table-column
        v-if="!h['hidden']"
        :key="h[name]"
        :width="h['width']"
        :prop="h[name]"
        :label="h[label]"
        show-overflow-tooltip />
    </slot>
    <slot name="right"></slot>
  </el-table>
</template>
<script>
export default {
  name: 'uTable',
  props: {
    // header表头
    header: {
      type: Array,
    },
    // selection是否
    selection: {
      type: Boolean,
      default: false,
    },
    // 是否可选
    selectable: {
      type: Function,
    },
    // 列表数据
    data: {
      type: Array,
    },
    // 选中的列数
    multipleSelection: {
      type: Array
    },
    // 对应表头header的自定义key值
    name: {
      type: String,
      default: 'key'
    },
    // 对应表头header的自定义value值
    label: {
      type: String,
      default: 'label'
    },
    // 是否带边框
    border: {
      type: Boolean,
      default: false
    },
    // 点击特殊列触发的方法
    handleCellClick: {
      type: Function,
    },
    // 需要触发特殊操作的列
    handleCellArray: {
      type: Array,
      default: () => []
    },
    // 高度
    height: {
      type: String,
      default: '100%'
    },
    // 尺寸
    size: {
      type: String,
      default: 'medium'
    },
    /**
     * 单元格样式
     */
    cellStyle: {
      type: Function
    },
    /**
     * 行样式
     */
    'row-class-name': {
      type: Function,
    },
    /**
     * 展示合计
     */
    'show-summary': {
      type: Boolean,
      default: false
    },
    /**
     * 合计方法
     */
    'summary-method': {
      type: Function
    },
    /**
     * 树形表格
     */
    'tree-props': {
      type: Object
    },
    'row-key': {
      type: [String, Function]
    },
    'default-expand-all': {
      type: Boolean
    },
  },
  mounted () {
    if (this.multipleSelection) {
      const rows = this.multipleSelection
      rows.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    }
  },
  methods: {
    /**
     * 有选择操作时，默认渲染已选中的值
     * @param {array} val 选中的列
     */
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    /**
     * 重新布局
     */
    doLayout () {
      this.$refs.multipleTable.doLayout()
    }
  },
}
</script>
<style lang="stylus" scoped>
>>>.el-link + .el-link {
  margin-left 5px
}
</style>

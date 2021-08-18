<template>
  <el-form v-bind="$props" ref="formModel" size="small">
    <slot name="start"></slot>
    <el-form-item :prop="key" :rules="rules" :label="label" v-for="{
      label,
      key,
      placeholder,
      maxlength = 100,
      type,
      list,
      rules,
      dateType,
      desc,
      isRange,
      className,
      // select的change事件拓展
      change = () => {},
      clearable = true,
      multiple = false,
      valueFormatDate = 'yyyy-MM-dd',
      valueFormatTime = 'HH:mm:ss',
      format,
      width = '240px',
    } in options" :key="key">
      <template v-if="type === 'slot'">
        <slot :name="key"></slot>
      </template>
      <template v-if="!type || type === 'input'">
        <el-input :type="dateType || 'text'" :placeholder="placeholder" clearable v-model.trim="model[key]" :maxlength="maxlength"></el-input>
      </template>
      <template v-if="type === 'radio'">
        <el-radio-group v-model="model[key]">
          <el-radio v-for="{
            label,
            value
          } in list" :key="value" :label="value">{{label}}</el-radio>
        </el-radio-group>
      </template>
      <template v-if="type === 'select'">
        <el-select  v-model="model[key]" :clearable="clearable" :placeholder="placeholder" @change="change" :multiple='multiple' collapse-tags>
          <el-option
            v-for="{
              value,
              label
            } in list"
            :key="value"
            :label="label"
            :value="value">
          </el-option>
        </el-select>
      </template>
      <template v-if="type === 'checkbox'">
        <el-checkbox-group v-model="model[key]">
          <el-checkbox v-for="{
              value,
              label
            } in list"
            :key="value"
            :label="value">{{label}}</el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-if="type === 'switch'">
        <el-switch
          v-model="model[key]"
          :name="label">
        </el-switch>
        <span class="switch-desc">{{desc}}</span>
      </template>
      <template v-if="type === 'date'">
        <el-date-picker
          :format="format"
          :style="{ width }"
          :value-format="valueFormatDate"
          v-model="model[key]"
          :type="dateType"
          :placeholder="placeholder">
        </el-date-picker>
      </template>
      <template v-if="type === 'time'">
        <el-time-picker
          :value-format="valueFormatTime"
          v-model="model[key]"
          :is-range="isRange"
          :class="className"
          :placeholder="placeholder">
        </el-time-picker>
      </template>
      <template v-if="type === 'range'">
        <el-input
          v-model.trim="model[key.split(',')[0]]"
          style="width:85px;"
          clearable
        ></el-input>
        <span>~</span>
        <el-input
          v-model.trim="model[key.split(',')[1]]"
          style="width:85px;"
          clearable
        ></el-input>
      </template>
      <template v-if="type === 'cascader'">
        <el-cascader
          :options="list"
          v-model="model[key]"
        ></el-cascader>
      </template>
    </el-form-item>
    <slot name="end"></slot>
    <el-form-item>
      <slot name="button-left"></slot>
      <el-button type="primary" :size="size" @click="searchData">{{buttonText}}</el-button>
      <el-button plain :size="size" @click="resetForm" v-if="resetText">{{resetText}}</el-button>
      <slot name="button-right"></slot>
    </el-form-item>
    <slot name="right"></slot>
  </el-form>
</template>
<script>
export default {
  name: 'uForm',
  props: {
    // 表单配置信息，用于渲染表单结构
    options: {
      type: Array
    },
    // 表单中左侧按钮名称
    buttonText: {
      type: String,
      default: '查询'
    },
    // 表单重置按钮名称
    resetText: {
      type: String,
      default: '重置'
    },
    /**
     * 使用v-bind="$props"继承el-form默认props
     * 二次封装组件中统一赋值
     * @see https://element.eleme.cn/#/zh-CN/component/form
     */
    // 表格信息对象
    model: {
      type: Object,
    },
    // label宽度
    'label-width': {
      type: String,
      default: 'auto'
    },
    // label位置
    'label-position': {
      type: String,
      default: 'left'
    },
    // 单行表单
    inline: {
      type: Boolean,
      default: true,
    },
    // 尺寸
    size: {
      type: String,
      default: 'medium'
    },
  },
  methods: {
    /**
     * 重置表单
     * 如果有列表，当前页重置为1，每页条数重置为第一种
     */
    resetForm () {
      this.$refs.formModel.resetFields()
      const range = this.options.filter(i => i.type === 'range')
      // 特殊处理范围
      if (range.length) {
        const keys = range.map(i => i.key.split(','))
        keys.forEach(([a, b]) => {
          this.model[a] = ''
          this.model[b] = ''
        })
      }
      this.$nextTick(() => {
        this.$emit('change', { page: 1 })
      })
    },
    /**
     * 验证通过
     */
    searchData () {
      this.$refs.formModel.validate((valid) => {
        if (valid) {
          this.$emit('change', { page: 1 })
        } else {
          this.$message.error('表单填写不正确')
          return false
        }
      })
    }
  },
}
</script>
<style scoped>
.switch-desc{
  margin-left: 10px;
  display: inline-block;
  color: #999;
}
</style>

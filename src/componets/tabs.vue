<template>
  <warperModel :showPage="false" :showAction="showAction">
    <template slot="top">
      <el-tabs v-model="active" @tab-click="handleClick">
        <el-tab-pane v-for="i in tabs" :key="i.key" :label="i.name" :name="i.key" />
      </el-tabs>
    </template>
    <template slot="action" v-if="showAction">
      <slot name="action" />
    </template>
    <template slot="table">
      <slot :active="active" />
    </template>
  </warperModel>
</template>
<script>
export default {
  name: 'uTabs',
  props: {
    tabs: {
      type: Array,
      default: () => ([])
    },
    showAction: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      active: this.tabs[0].key
    }
  },
  methods: {
    /**
     * 切换页签
     */
    handleClick (tab) {
      this.log('【当前页签】', tab.name)
    },
    /**
     * 切换tab
     */
    changeTab (tab) {
      this.active = tab
    },
  }
}
</script>

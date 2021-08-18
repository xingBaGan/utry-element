<template>
  <div class="opt-warper">
    <span class="el-icon-edit icon">操作</span>
    <slot />
  </div>
</template>
<style lang="stylus" scoped>
.opt-warper{
  >>> .icon {
    line-height 20px
    &::before{
      padding-right 10px
    }
    margin-right 10px
  }
  >>>.el-link {
    margin-right 10px
  }
}
</style>

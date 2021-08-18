<template>
  <el-card v-bind="$props" class="uCard" :class="'uCard-' + size" shadow="never">
    <div class="uCard-item">
      <slot />
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'uCard',
  props: {
    header: {
      type: String,
    },
    /**
     * 尺寸，medium / small / mini
     */
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>
<style lang="stylus" scoped>
.uCard{
  width 85%
  margin 20px 0 20px 100px;
  &-medium{
    max-width 1200px;
  }
  &-small{
    max-width 900px;
  }
  &-mini{
    max-width 600px;
  }
  &-item{
    padding 20px
  }
}
</style>

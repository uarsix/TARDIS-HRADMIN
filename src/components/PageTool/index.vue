<!-- eslint-disable vue/require-default-prop -->
<template>
  <el-card>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <el-alert
          :title="title"
          type="info"
          show-icon
          :closable="false"
          style="background-color: rgba(230, 247, 255)"
        >
        </el-alert>
      </el-col>
      <el-col
        ><el-row type="flex" justify="end"> <slot name="right"> </slot></el-row
      ></el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  filters: {},
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    title: {
      type: [String, Number]
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () { },
  methods: {}
}
</script>

<style scoped lang='scss'>
.el-alert {
  display: inline;
  width: unset;
  ::v-deep .el-icon-info {
    font-size: 14px;
  }
}
</style>

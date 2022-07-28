<template>
  <el-form>
    <el-form-item label-width="100px" label="企业名称">
      <el-input placeholder="" disabled :value="info.name"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="公司地址">
      <el-input placeholder="" disabled :value="info.companyAddress"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="公司电话">
      <el-input placeholder="" disabled :value="info.companyPhone"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="邮箱">
      <el-input placeholder="" disabled :value="info.mailbox"></el-input>
    </el-form-item>
    <el-form-item label-width="100px" label="备注">
      <el-input placeholder="" disabled :value="info.remarks"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCompanyInfo } from '@/api/seting'
export default {
  filters: {},
  components: {},
  data () {
    // eslint-disable-next-line object-curly-spacing
    return { info: {} }
  },
  computed: { ...mapGetters(['companyId']) },
  watch: {},
  async created () {
    const res = await getCompanyInfo(this.companyId)
    this.info = res
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
::v-deep .el-input__inner {
  width: 400px;
}
</style>

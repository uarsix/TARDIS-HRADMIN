<template>
  <div>
    <el-button type="primary" size="mini" @click="roleDialogVisible = true"
      >新增角色</el-button
    >
    <el-dialog :visible.sync="roleDialogVisible" title="新增角色" @close="reset"
      ><el-form ref="myForm" label-width="80px" :model="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button type="primary" @click="onClick">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
import { addRole, editRole } from '@/api/seting'
export default {
  filters: {},
  components: {},
  props: {
    edit: {
      type: Boolean,
      required: true
      // eslint-disable-next-line vue/require-default-prop
    }, row: {
      type: Object
    }
  },
  data () {
    return {
      roleDialogVisible: false,
      form: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {
    edit (newedit, oldedit) {
      this.roleDialogVisible = this.edit
      this.form = this.row
    }
  },
  updated () { this.validate = this.isEdit },
  created () { },
  methods: {
    onClick () {
      // 二次校验
      this.$refs.myForm.validate(async bool => {
        if (!bool) { return this.$message.error('非法数据') }
        if (this.edit) { await editRole(this.form) } else {
          await addRole(this.form)
        }
      })
      this.$emit('addRole')
      this.roleDialogVisible = false
      this.$emit('editChange', false)
    },
    reset () {
      // 重置表单
      this.$emit('editChange', false)
      this.$refs.myForm.resetFields()
      this.roleDialogVisible = false
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

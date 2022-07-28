<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; padding: 30px 140px; font-size: 14px; width: 100%"
    >
      <el-col>
        <span>{{ node.data ? node.data.name : node.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="end">
          <!-- 两个内容 -->
          <el-col>{{ node.data ? node.data.manager : "负责人" }}</el-col>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <el-col>
            <!-- 下拉菜单 element -->
            <el-dropdown @command="onCommand">
              <span> 操作<i class="el-icon-arrow-down" /> </span>
              <!-- 下拉菜单 -->

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">添加子部门</el-dropdown-item>
                <template v-if="node.data">
                  <el-dropdown-item command="b">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="c">删除部门</el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      :title="title"
      :visible.sync="addDialogVisible"
      width="50%"
      height="50%"
      @close="handleAddClose"
      @click.native.stop
    >
      <!-- 组织冒泡      @click.native.stop -->
      <el-form ref="formRef" :model="formData" :rules="rules">
        <el-form-item label-width="100px" label="部门名称" prop="name"
          ><el-input v-model="formData.name" placeholder="1-50个字符"></el-input
        ></el-form-item>
        <el-form-item label-width="100px" label="部门编码" prop="code"
          ><el-input v-model="formData.code" placeholder="1-50个字符"></el-input
        ></el-form-item>
        <el-form-item label-width="100px" label="部门负责人" prop="manager"
          ><el-select
            v-model="formData.manager"
            placeholder="1-50个字符"
            filterable
          >
            <el-option
              v-for="item in SimpleUserList"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option> </el-select
        ></el-form-item>
        <el-form-item label-width="100px" label="部门介绍" prop="introduce"
          ><el-input
            v-model="formData.introduce"
            placeholder="1-300个字符"
            type="textarea"
          ></el-input
        ></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onsubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delDepartment, addDepartment, getSimpleUserList, getDepartments, isEditDepartment } from '@/api/departments'
export default {
  filters: {},
  components: {},
  props: {
    node: { type: Object, required: true }
  },
  data () {
    const validateName = async (rule, value, callback) => {
      const res = await getDepartments()
      if (this.isEdit) {
        const pid = this.node.data.pid
        console.log(1)
        res.depts.filter(item => item.pid === pid && item.id !== this.node.data.id).some(item1 => item1.name === value) ? callback(new Error('重复部门')) : callback()
      } else {
        const id = this.node.data ? this.node.data.id : ''
        res.depts.filter(item => item.pid === id).some(item1 => item1.name === value) ? callback(new Error('重复部门')) : callback()
      }
    }

    return {
      addDialogVisible: false,
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '必填1-50个字符', trigger: 'blur' }, { validator: validateName, trigger: 'change' }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' }, { min: 1, max: 50, message: '必填1-50个字符', trigger: 'blur' }],
        manager: [{ required: true, message: '部门管理者不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' }, { min: 1, max: 300, message: '必填1-300个字符', trigger: 'blur' }]
      },
      SimpleUserList: [],
      // 是否在编辑
      isEdit: false
    }
  },
  computed: {
    title () {
      return this.isEdit ? '编辑' : '添加'
    }
  },
  watch: {},
  created () { },
  methods: {
    async onCommand (key) {
      if (!this.SimpleUserList.length) {
        this.getSimpleUserList()
        console.log(this.SimpleUserList.length)
      }
      if (key === 'a') {
        this.isEdit = false
        this.addDialogVisible = true
      }
      if (key === 'b') {
        this.isEdit = true
        this.addDialogVisible = true
        this.formData = { ...this.node.data }
      }
      if (key === 'c') {
        try {
          await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'

          })
          if (this.node.data.id) {
            await delDepartment(this.node.data.id)
            this.$emit('delDepartment')
          }
        } catch (err) {
          console.log(err.message)
          if (!err.message) {
            this.$notify({
              message: err,
              duration: 800
            })
          }
        }
      }
    },
    async onsubmit () {
      if (this.isEdit) {
        delete this.formData.children
        await isEditDepartment(this.formData)
      } else {
        this.formData.pid = this.node.data ? this.node.data.id : ''
        addDepartment(this.formData)
      }
      this.$emit('delDepartment')
      this.addDialogVisible = false
    },
    handleAddClose () { this.$refs.formRef.resetFields() },

    async getSimpleUserList () {
      const res = await getSimpleUserList()
      this.SimpleUserList = res
    }
  }
}

</script>

<style lang="scss" scoped>
.el-col-24 {
  overflow: hidden;
}
</style>

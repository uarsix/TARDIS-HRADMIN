<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTool>
        <template #right
          ><el-button type="primary" size="mini" @click="DialogShowForm('0')"
            >添加权限</el-button
          >
        </template></PageTool
      >
      <el-card>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
        >
          <el-table-column prop="name" label="名称"> </el-table-column>
          <el-table-column prop="code" label="标识"> </el-table-column>
          <el-table-column prop="description" label="描述"> </el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.type === 1"
                type="text"
                @click="DialogShowForm(scope.row.id)"
                >添加</el-button
              >
              <span v-else style="width: 1.5em; display: inline-block"></span>
              <el-button type="text" @click="editDialog(scope.row)"
                >编辑</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table></el-card
      >
      <el-dialog
        :visible.sync="DialogShow"
        :title="title"
        @close="closeFormReset"
      >
        <el-form
          ref="refForm"
          :model="permissionFrom"
          :rules="permissionFromRules"
        >
          <el-form-item label="权限名称" label-width="80px" prop="name"
            ><el-input v-model="permissionFrom.name"></el-input
          ></el-form-item>
          <el-form-item label="权限标识" label-width="80px" prop="code"
            ><el-input v-model="permissionFrom.code"></el-input
          ></el-form-item>
          <el-form-item label="权限描述" label-width="80px" prop="description"
            ><el-input v-model="permissionFrom.description"></el-input
          ></el-form-item>
          <el-form-item prop="enVisible" label-width="80px" label="开启">
            <el-switch v-model="permissionFrom.enVisible"></el-switch
          ></el-form-item>
        </el-form>
        <template #footer>
          <el-button type="primary" size="mini" @click="addPermission"
            >确定</el-button
          >
          <el-button size="mini" @click="DialogShow = false">取消</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addPermission, editPermission } from '@/api/permission'
import { getPermissions } from '@/api/seting'
import { tranferListToTree } from '@/utils'
export default {
  name: 'Permission',
  filters: {},
  components: {},
  data () {
    return {
      tableData: [],
      DialogShow: false,
      permissionFrom: {
        enVisible: 'false',
        name: '',
        code: '',
        description: '',
        type: '1',
        pid: '0'
      },
      id: null,
      permissionFromRules: {
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title () {
      return this.id ? '新增权限' : '编辑权限'
    }
  },
  watch: {},
  created () {
    this.getPermissions()
  },
  methods: {
    async getPermissions () {
      let res = await getPermissions()
      res = tranferListToTree(res, '0')
      this.tableData = res
      console.log(res)
    },
    DialogShowForm (id) {
      this.id = id
      this.DialogShow = true
    },
    editDialog (row) {
      console.log(row)
      this.permissionFrom = { ...row }
      this.id = null
      this.DialogShow = true
    },
    closeFormReset () {
      this.$refs.refForm.resetFields()
      this.permissionFrom = {
        enVisible: 'false',
        name: '',
        code: '',
        description: '',
        type: '1',
        pid: '0'
      }
    },
    // eslint-disable-next-line vue/no-dupe-keys
    async addPermission (type) {
      if (this.id) {
        this.permissionFrom.type = this.id === '0' ? 1 : 2
        this.permissionFrom.pid = this.id === '0' ? 0 : this.id
        await addPermission(this.permissionFrom)
      } else {
        await editPermission(this.permissionFrom)
      }
      this.getPermissions()
      this.DialogShow = false
    }
  }
}
</script>

<style scoped lang='scss'>
</style>

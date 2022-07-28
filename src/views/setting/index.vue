<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first"
            ><roleChange
              :edit="edit"
              :row="row"
              @addRole="getRoleList"
              @editChange="edit = false"
            ></roleChange>
            <!-- 新增列表 -->
            <el-table :data="roleList" border>
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column label="角色名" prop="name"></el-table-column>
              <el-table-column
                label="描述"
                prop="description"
              ></el-table-column>
              <el-table-column label="操作"
                ><template v-slot="scope">
                  <el-button type="text" @click="dialogChange(scope.row.id)"
                    >分配权限</el-button
                  ><el-button type="text" @click="showRoleDialog(scope.row)"
                    >修改</el-button
                  ><el-button type="text" @click="del(scope.row.id)"
                    >删除</el-button
                  >
                </template></el-table-column
              >
            </el-table>
            <el-row type="flex" justify="end">
              <!-- 分页 -->
              <el-pagination
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                :current-page="paramsObj.page"
                :page-size="paramsObj.pagesize"
                :page-sizes="[2, 3, 4, 5, 6]"
                @size-change="handleSizeChange"
                @current-change="handelCurrentChange"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">
            <CompanyInfo></CompanyInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- dialog -->
    <el-dialog
      v-if="dialogVisible"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-tree
        ref="treeRef"
        :data="permission"
        :props="{ label: 'name' }"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="selectPermissionId"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTree(id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delRole, getPermissions, getPermissionsById, getAssignPrem } from '@/api/seting'
import { tranferListToTree } from '@/utils/index'
import roleChange from './components/role.vue'
import CompanyInfo from './components/CompanyInfo.vue'
export default {
  filters: {},
  components: { roleChange, CompanyInfo },
  data () {
    return {
      activeName: 'first',
      paramsObj: {
        page: 1,
        pagesize: 4
      },
      roleList: [],
      total: null,
      dialogVisible: false,
      permission: [],
      selectPermissionId: [], id: null, edit: false,
      row: {}
    }
  },
  computed: {},
  watch: {},
  created () { this.getRoleList() },
  methods: {
    async getRoleList () {
      const res = await getRoleList(this.paramsObj)
      this.roleList = res.rows
      this.total = res.total
    },
    handleClick () { },
    handleSizeChange (pagesize) {
      this.paramsObj.pagesize = pagesize
      this.getRoleList(this.paramsObj)
    },
    handelCurrentChange (page) {
      this.paramsObj.page = page
      this.getRoleList(this.paramsObj)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await delRole(id)
        if (this.roleList.length === 1 && this.paramsObj.page > 1) { this.paramsObj.page-- }
        this.getRoleList()
      }).catch((err) => {
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        } else {
          this.$message({
            type: 'info',
            message: err
          })
        }
      }
      )
    },
    // 全选分配
    async dialogChange (id) {
      this.id = id
      const res = await getPermissions()
      this.permission = tranferListToTree(res, '0')
      const res1 = await getPermissionsById(id)
      this.selectPermissionId = res1.permIds
      this.dialogVisible = true
    },
    async saveTree (id) {
      const permIds = this.$refs.treeRef.getCheckedNodes()
      await getAssignPrem(id, permIds)
      this.dialogVisible = false
    },
    showRoleDialog (ev) {
      this.edit = true
      console.log(this.edit)
      console.log(1)
      this.row = Object.assign({}, ev)
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-table {
  margin: 20px 0 20px 0 !important;
}
</style>

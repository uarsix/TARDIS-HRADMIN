<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTool title="哈哈哈">
        <!-- 具名插槽 -->
        <template #right>
          <el-button size="mini" type="danger" @click="exportExcel"
            >普通excel导出</el-button
          >
          <el-button size="mini" type="info" @click="exportFn"
            >复杂excel导出</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button size="mini" type="primary" @click="addEmployees"
            >新增员工</el-button
          ></template
        >
      </PageTool>
      <el-card style="margin-top: 14px">
        <el-table border :data="employeesList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column
            label="姓名"
            sortable
            prop="username"
            align="center"
          ></el-table-column>
          <el-table-column label="头像" prop="staffPhoto" align="center">
            <template v-slot="scope">
              <img
                v-imgError
                :src="scope.row.staffPhoto"
                style="width: 40px"
                @click="QRDialogChange(scope.row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="手机号"
            sortable
            prop="mobile"
          ></el-table-column>
          <el-table-column
            align="center"
            label="工号"
            sortable
            prop="workNumber"
          ></el-table-column>
          <el-table-column
            align="center"
            label="聘用形式"
            sortable
            prop="formOfEmployment"
            :formatter="formatterEmployee"
          ></el-table-column>
          <el-table-column
            align="center"
            label="聘用形式"
            sortable
            prop="formOfEmployment"
          >
            <template v-slot="scope">{{
              scope.row.formOfEmployment | formatterEmployee
            }}</template></el-table-column
          >
          <el-table-column
            label="部门"
            sortable
            prop="departmentName"
            align="center"
          ></el-table-column>
          <el-table-column
            align="center"
            label="入职时间"
            sortable
            prop="timeOfEntry"
            ><template v-slot="scope">
              {{ scope.row.timeOfEntry | dateformat }}
            </template></el-table-column
          >
          <el-table-column
            label="状态"
            sortable
            prop="enableState"
            align="center"
            ><template v-slot="scope">
              <el-switch :value="scope.row.enableState"></el-switch> </template
          ></el-table-column>
          <el-table-column label="操作" sortable width="350px" align="center">
            <template v-slot="scope">
              <el-button
                type="text"
                @click="$router.push(`/employees/detail/${scope.row.id}`)"
                >查看</el-button
              >
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="roleDialogChange(scope.row.id)"
                >角色</el-button
              >
              <el-button type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- 新增员工 -->
    <el-dialog
      title="新增员工"
      :visible.sync="addEmployeesDialogShow"
      width="70%"
      @close="handleClose"
    >
      <el-form
        ref="fromRef"
        label-width="80px"
        :model="employeeForm"
        :rules="employeeFormRules"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="employeeForm.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="employeeForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            v-model="employeeForm.timeOfEntry"
            type="date"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="employeeForm.formOfEmploymen"
            placeholder="请选择"
          >
            <el-option
              v-for="item in hireType"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input v-model="employeeForm.workNumber"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="departmentName">
          <el-input
            v-model="employeeForm.departmentName"
            @focus="showDepartment"
          ></el-input>
          <template v-if="departmentList.length > 0">
            <el-tree
              :data="departmentList"
              :props="{ label: 'name' }"
              default-expand-all
              @node-click="handelNodeClick"
            ></el-tree>
          </template>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            v-model="employeeForm.correctionTime"
            type="date"
            placeholder="选择日期"
            clearable
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmployeesDialogShow = false">取 消</el-button>
        <el-button type="primary" @click="addEmployeesDialogShow = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 员工复选框dialog -->
    <el-dialog title="分配角色" :visible.sync="roleDialogShow">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{
          item.name
        }}</el-checkbox>

        ></el-checkbox-group
      >

      <template #footer>
        <el-button type="primary" @click="assignRoles">确定</el-button
        ><el-button @click="roleDialogShow = false">取消</el-button>
      </template>
    </el-dialog>
    <!-- 点击图片显示二维码弹出层 -->
    <el-dialog title="二维码" :visible.sync="qrDialogShow">
      <el-row type="flex" justify="center">
        <canvas ref="canvas"></canvas>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { getDepartmentsDataRecursive } from '@/views/departments/getDepartmentsData'
import employees from '@/constant/employees'
import { validMobile } from '@/utils/validate'
import { getRoleList } from '@/api/seting'
import { getEmployees, assignRoles } from '@/api/employees'
import { getUserDetailById } from '@/api/user'
import { getExportData, getExportHeaders } from './compoents'
import QRCode from 'qrcode'
export default {
  name: 'Employees',
  components: {},
  filters: {
    formatterEmployee (id) {
      if (employees.hireType.find(item => item.id === id)) {
        return employees.hireType.find(item => item.id === id).value
      } else {
        return '未知'
      }
    }
  },
  data () {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('请验证手机号格式'))
    }
    return {
      // 点击头像图片显示二维码
      qrDialogShow: false,

      paramsObj: {
        page: 1,
        size: 30
      },
      total: '',
      employeesList: [],
      excelExport: {
        page: 1,
        size: 99999
      },
      // 新增员工
      addEmployeesDialogShow: false,
      employeeForm: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      employeeFormRules: {
        mobile: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '必填', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '必填', trigger: 'blur' }
        ]
      },

      // 选中数组
      roleDialogShow: false,
      checkList: ['选中且禁用', '复选框 A'],
      roleList: [],
      id: null,
      hireType: employees.hireType,
      departmentList: []

    }
  },
  computed: {},
  watch: {},
  created () {
    this.getEmployees()
  },
  methods: {
    async getEmployees () {
      const res = await getEmployees(this.paramsObj)
      this.employeesList = res.rows
      this.total = res.total
    },
    formatterEmployee (row, colum, cellValue, index) {
      if (employees.hireType.find(item => item.id === cellValue - 0)) { return employees.hireType.find(item => item.id === cellValue - 0).value } else { return '未知' }
    },
    async exportExcel () {
      // 导出
      // 获取所有的数据
      const { rows } = await getEmployees({ page: 1, pagesize: 9999 })
      // 删除密码和头像
      rows.forEach(data => {
        delete data.password
        delete data.staffPhoto
      })

      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = getExportHeaders(rows)
        const data = getExportData(rows)
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填

          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填

        })
      })
    },
    // 导出复杂数据
    exportFn () {
      const multiHeader = [['', '主要信息', '', '', '', '', '']]
      const merges = ['A1:A2', 'B1:F1', 'G1:G2']
      const tHeader = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const data = [
        ['张三', '13000000', '2019-1-1', '正式', '2019-1-2', '110', 'java部门'],
        ['李四', '13000000', '2019-1-1', '正式', '2019-1-2', '111', 'java部门']
      ]

      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          multiHeader, // 第一行表头 复杂表头
          data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          merges // 设置合并规则
        })
      })
    },
    addEmployees () {
      this.addEmployeesDialogShow = true
    },
    // 角色分配
    async roleDialogChange (id) {
      this.id = id
      const { rows } = await getRoleList({ page: 1, pagesize: 9999 })
      this.roleList = rows
      // 获取用户的基本信息
      const { roleIds } = await getUserDetailById(id)
      this.checkList = roleIds
      console.log(this.checkList)
      this.roleDialogShow = true
    },
    // 角色分配 给确定绑定点击事件
    async assignRoles () {
      await assignRoles({ id: this.id, roleIds: this.checkList })
      this.roleDialogShow = false
      this.getEmployees()
    },
    // 关闭重置表单
    handleClose () {
      this.$refs.fromRef.resetFields()
      this.departmentList = []
    },
    // 部门
    async showDepartment () {
      try {
        const res = await getDepartments()
        const data = await getDepartmentsDataRecursive(res.depts, '')
        this.departmentList = data
      } catch (err) { console.log(err) }
    },
    handelNodeClick (obj) {
      this.employeeForm.departmentName = obj.name
      this.departmentList = []
    },
    QRDialogChange (img) {
      this.qrDialogShow = true
      this.$nextTick(() => {
        QRCode.toCanvas(this.$refs.canvas, img, function (error) {
          if (error) console.error(error)
          console.log('success!')
        })
      })
    }
  }

}
</script>

<style scoped lang='scss'>
</style>

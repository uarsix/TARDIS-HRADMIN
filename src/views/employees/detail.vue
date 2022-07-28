<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- 修改个人信息 包含 账户名 密码 -->
      <el-tab-pane label="登陆账户设置" name="first"
        ><el-form
          ref="formRef"
          :model="userInfo"
          :rules="userInfoRules"
          style="width: 400px; margin-left: 200px; margin-right: 200px"
          label-width="80px"
        >
          <el-form-item label="账户" prop="username"
            ><el-input v-model="userInfo.username"></el-input
          ></el-form-item>
          <el-form-item label="密码" prop="password"
            ><el-input v-model="userInfo.password"></el-input
          ></el-form-item>
          <el-form-item
            ><el-button type="primary" @click="saveUserInfo">更新</el-button>
            <el-button type="info">取消</el-button>
          </el-form-item>
        </el-form>
        <div>{{ id }}</div>
      </el-tab-pane>
      <!-- 个人信息 -->
      <el-tab-pane label="个人详情" name="second">
        <UserInfos :id="id"></UserInfos>
      </el-tab-pane>
      <!-- 岗位信息 -->
      <el-tab-pane label="岗位信息" name="third">
        <JobInfo></JobInfo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveEmployee } from '@/api/employees'
import UserInfos from './compoents/UserInfo.vue'
import JobInfo from './compoents/JobInfo.vue'
export default {
  name: 'Detail',
  filters: {},
  components: { UserInfos, JobInfo },
  props: {
    id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      activeName: 'first',
      userInfo: {
        username: '',
        password: ''
      },
      userInfoRules: {
        username: [{ required: true, message: '请输入账户名', trigger: 'blur' }]
      }

    }
  },
  computed: {},
  watch: {},
  created () {
    // 数据回显
    this.getUserDetailById()
  },
  methods: {
    // 数据回显方法
    async getUserDetailById () {
      const res = await getUserDetailById(this.id)
      res.password = null
      this.userInfo = res
    },
    // 修改个人账户信息
    saveUserInfo () {
      this.$refs.formRef.validate(async valid => {
        if (!valid) {
          return this.$message.error('信息校验失败')
        }
        await saveEmployee(this.id, this.userInfo)
        this.getUserDetailById()
      })
    }
  }
}
</script>

<style scoped lang='scss'>
</style>
